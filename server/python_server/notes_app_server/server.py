"""A simple server with a REST API for the Notes App frontend."""
import tornado.escape
import tornado.ioloop
import tornado.web

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
    return [p for p in s.split(" ") if p]


def search_notes(query):
    """Search notes by query."""
    def match_token(note, tokens):
        """Test if note contains any of the tokens."""
        for token in query_tokens:
            for part in ["title", "text"]:
                if token in note[part]:
                    return True
        return False

    notes = []
    query_tokens = tokenize(query)
    for note in db["notes"]:
        if match_token(note, query_tokens):
            notes.append(note)
    return notes


class CorsBaseHandler(CorsMixin, tornado.web.RequestHandler):
    """Set up CORS and allow separate origin for the client."""

    CORS_ORIGIN = 'http://localhost:8080'


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


application = tornado.web.Application([
    (r"/version", VersionRootHandler),
    (r"/notes", NotesRootHandler),
    (r"/notes/titles", NotesTitlesHandler),
    (r"/search", NotesSearchHandler),
])


def is_using_test_db():
    """Check if started with use test db flag."""
    return "--use-test-db" in sys.argv


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
