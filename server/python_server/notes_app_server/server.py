"""A simple server with a REST API for the Notes App frontend."""
import tornado.escape
import tornado.ioloop
import tornado.web
import tornado.escape

from tornado_cors import CorsMixin

import logging
import json
import os
import signal
import sys

PORT = 3456
DB_PATH = "db.json"
TEST_DB_PATH = "test/test_db.json"

db = {
    'version': {
        'version': '0.0.1',
        'api_version': '0.1',
        'is_test_db': True
    },
    'notes': [
        {
            'title': 'some note title',
            'text': 'some note text'
        },
        {
            'title': 'other note title',
            'text': 'other note text'
        }
    ]
}


def tokenize(s):
    """Split string into tokens."""
    return [p.lower() for p in s.split(" ") if p]


class NoteAlreadyExists(Exception):
    """Raised if trying to add a new note with title that is already taken."""

    def __init__(self, title):
        """Show exception with the note title."""
        super(NoteAlreadyExists, self).__init__(title)


class NoSuchNoteExists(Exception):
    """Raised if trying to delete a note that doesn't exist."""

    def __init__(self, title):
        """Show exception with the note title."""
        super(NoSuchNoteExists, self).__init__(title)


def add_note(note):
    """Add note to notes."""
    if find_note(note["title"]):
        raise NoteAlreadyExists(note["title"])
    db["notes"].append(note)


def delete_note(title):
    """Delete note from notes."""
    found = find_note(title)
    if not found:
        raise NoSuchNoteExists(title)
    del db["notes"][found[0]]


def update_note(title, note):
    """Update an existing note with a given title, possibly retitling it."""
    found = find_note(title)
    if not found:
        raise NoSuchNoteExists(title)
    note["timestamp"]["created"] = found[1]["timestamp"]["created"]
    db["notes"][found[0]] = note


def find_note(title):
    """Return (index, note) of note that has title or False if no such note."""
    for i, note in enumerate(db["notes"]):
        if note["title"] == title:
            return i, note
    return False


def search_notes(query):
    """Search notes by query."""
    def match_token(note, tokens):
        """Test if note contains any of the tokens.

        A very simple implementation still. Return False if any of the tokens
        is missing, True if any match.
        """
        tokens_found = []
        for token in tokens:
            s = note["title"] + " " + note["text"]
            if token not in s.lower():
                return False
            tokens_found.append(token)
        return len(tokens_found) == len(tokens)

    notes = []
    query_tokens = tokenize(query)
    for note in db["notes"]:
        if match_token(note, query_tokens):
            notes.append(note)
    return notes


class CorsBaseHandler(CorsMixin, tornado.web.RequestHandler):
    """Set up CORS and allow separate origin for the client."""

    CORS_ORIGIN = 'http://localhost:8080'
    CORS_METHODS = 'GET, PUT, DELETE'
    CORS_HEADERS = (
        'Access-Control-Allow-Headers, '
        'Origin, '
        'Accept, '
        'X-Requested-With, '
        'Content-Type, '
        'Access-Control-Request-Method, '
        'Access-Control-Request-Headers'
        )


class VersionRootHandler(CorsBaseHandler):
    """Handle /version ."""

    def get(self):
        """Handle get and return verision and api_version."""
        response = {
            'version': '0.0.1',
            'api_version': '0.1',
            'is_test_db': True
        }
        self.write(response)


class NotesRootHandler(CorsBaseHandler):
    """Handle /notes ."""

    def get(self):
        """Handle get and return all notes from database."""
        response = {
            'notes': db["notes"]
        }
        self.write(response)

    def put(self, *args, **kwargs):
        """Handle put and create / update give note."""
        note = json.loads(self.request.body.decode('utf-8'))
        title_update = note["title"]

        if isinstance(title_update, dict):
            find_title = title_update["old"]
            new_title = title_update["new"]
        else:
            find_title = title_update
            new_title = title_update

        _note = {
            'title': new_title,
            'text': note["text"],
            'timestamp': note["timestamp"]
        }

        found = find_note(find_title)
        if not found:
            add_note(_note)
            self.clear()
            self.set_status(200)
            self.finish("Note '{}' added.".format(find_title))
        else:
            update_note(find_title, _note)
            self.clear()
            self.set_status(204)
            self.finish("Note '{}' updated.".format(new_title))


class NoteHandler(CorsBaseHandler):
    """Handle /note/(.*) .

    /note/:title
        GET
        DELETE
    """

    def get(self, title):
        """Handle get and return note with given title from database."""
        found = find_note(title)

        if not found:
            self.clear()
            self.set_status(404)
            self.finish("Note '{}'' not found!".format(title))
            return

        response = found[1]
        self.write(response)

    def delete(self, title):
        """Handle delete and delete note with given title from database."""
        try:
            delete_note(title)
        except NoSuchNoteExists:
            self.clear()
            self.set_status(404)
            self.finish("Note '{}' does not even exist.".format(title))


class NotesTitlesHandler(CorsBaseHandler):
    """Handle /notes/titles ."""

    def get(self):
        """Handle get and return all note titles from database."""
        response = {
            'note_titles': [note["title"] for note in db["notes"]]
        }
        self.write(response)


class NotesSearchHandler(CorsBaseHandler):
    """Handle /search?q=(.*) ."""

    def get(self):
        """Handle get and return all notes matching search query."""
        response = {
            'notes': []
        }
        if self.get_argument('q') == "":
            response = {
                'notes': db["notes"]
            }
        else:
            response = {
                'notes': search_notes(self.get_argument('q'))
            }
        self.write(response)


class TestBeginHandler(CorsBaseHandler):
    """Handle /test/begin ."""

    def get(self):
        """Setup test to have expected state."""
        read_db()


class TestEndHandler(CorsBaseHandler):
    """Handle /test/begin ."""

    def get(self):
        """Setup test to have end with expected state afterwards."""
        read_db()


def is_using_test_db():
    """Check if started with use test db flag."""
    return "--use-test-db" in sys.argv


routes = [
    (r"/version", VersionRootHandler),
    (r"/notes", NotesRootHandler),
    (r"/notes/titles", NotesTitlesHandler),
    (r"/note/(.*)", NoteHandler),
    (r"/search", NotesSearchHandler),
]

test_routes = [
    (r"/test/begin", TestBeginHandler),
    (r"/test/end", TestEndHandler)
]

if is_using_test_db():
    routes.extend(test_routes)

application = tornado.web.Application(routes)


def read_db():
    """'Read in' database for use."""
    global db
    db_path = DB_PATH
    if is_using_test_db():
        db_path = TEST_DB_PATH

    logging.info("server path:", os.path.abspath(__file__))
    logging.info("server: db_path:", db_path)

    with open(db_path) as f:
        db = json.load(f)


is_closing = False


def signal_handler(signum, frame):
    """Signal handler for closing tornado."""
    global is_closing
    logging.info('exiting...')
    is_closing = True


def try_exit():
    """Try closing tornado."""
    global is_closing
    if is_closing:
        # clean up here
        tornado.ioloop.IOLoop.instance().stop()
        logging.info('exit success')


def start():
    """Start tornado."""
    logging.info("Starting server...")
    read_db()
    signal.signal(signal.SIGINT, signal_handler)
    application.listen(PORT)
    tornado.ioloop.PeriodicCallback(try_exit, 500).start()
    tornado.ioloop.IOLoop.instance().start()
    logging.info("Server stopped.")


if __name__ == "__main__":
    start()
