"""Test NotesApp backend for its rest api.

/notes
    GET                     - returns all notes
    PUT                     - update/create new note in notes
/notes/titles
    GET                     - returns titles of all notes
/note/:title
    GET                     - return note that has title :title
    DELETE                  - delete note with title :title
/search?q=:query
    GET                     - search notes with query and return the notes
/version
    GET                     - return database version information
"""
import unittest
import requests

URL = "http://localhost:3456"


def get(path):
    """Perform Get request."""
    return requests.get(URL + path)


class TestNotes(unittest.TestCase):
    """Test /notes/* .

    /notes
    /notes/titles
    """

    def test_notes_root(self):
        """Test /notes ."""
        r = get("/notes")
        self.assertEqual(r.status_code, 200)
        self.assertIn('application/json', r.headers['content-type'])
        self.assertIn('notes', r.json())
        notes = r.json()['notes']
        self.assertEqual(len(notes), 3)
        note = notes[0]
        for part in ['title', 'text']:
            self.assertIn(part, note)


class TestVersion(unittest.TestCase):
    """Test /version .

    /version
    """

    def test_version_root(self):
        """Test /version ."""
        r = get("/version")
        self.assertEqual(r.status_code, 200)
        self.assertIn('application/json', r.headers['content-type'])
        self.assertIn('version', r.json())
        self.assertIn('api_version', r.json())
        self.assertIn('is_test_db', r.json())


class NotTestDb(Exception):
    """Exception raised if not using test database."""

    pass


def check_using_test_db():
    """Check that the db in use is for testing."""
    e = NotTestDb("Not a test database! Start server with a test setup!")
    try:
        if not get("/version").json()["is_test_db"]:
            raise e
    except:
        raise e


if __name__ == '__main__':
    check_using_test_db()

    unittest.main()
