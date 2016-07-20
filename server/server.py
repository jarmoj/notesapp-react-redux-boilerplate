"""A simple server with a REST API for the Notes App frontend."""
import tornado.escape
import tornado.ioloop
import tornado.web

import sys
import json

PORT = 3456
DB_PATH = "db.json"
TEST_DB_PATH = "test_db.json"

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


class VersionRootHandler(tornado.web.RequestHandler):
    """Handle /version ."""

    def get(self):
        """Handle get and return verision and api_version."""
        response = {
            'version': '0.0.1',
            'api_version': '0.1',
            'is_test_db': True
        }
        self.write(response)


class NotesRootHandler(tornado.web.RequestHandler):
    """Handle /notes ."""

    def get(self):
        """Handle get and return all notes from database."""
        response = {
            'notes': db["notes"]
        }
        self.write(response)


application = tornado.web.Application([
    (r"/version", VersionRootHandler),
    (r"/notes", NotesRootHandler),
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

    with open(db_path) as f:
        db = json.load(f)

if __name__ == "__main__":
    read_db()
    application.listen(PORT)
    tornado.ioloop.IOLoop.instance().start()
