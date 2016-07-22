"""Test NotesApp backend for its rest api."""
import requests
import unittest
import subprocess
import time


PORT = 3456
URL = "http://localhost:" + str(PORT)


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

    def test_notes_titles(self):
        """Test /notes/titles ."""
        r = get("/notes/titles")
        self.assertEqual(r.status_code, 200)
        self.assertIn('application/json', r.headers['content-type'])
        self.assertIn('note_titles', r.json())
        titles = r.json()['note_titles']
        self.assertEqual(len(titles), 3)


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


class TestSearch(unittest.TestCase):
    """Test /search?q=(.*) .

    /search?q=(.*)
    """

    def test_search_empty_return_all(self):
        """Test /search?q= ."""
        r = get("/search?q=")
        self.assertEqual(r.status_code, 200)
        self.assertIn('application/json', r.headers['content-type'])
        self.assertIn('notes', r.json())
        notes = r.json()['notes']
        self.assertEqual(len(notes), 3)
        note = notes[0]
        for part in ['title', 'text']:
            self.assertIn(part, note)

    def test_search_wrong_return_none(self):
        """Test /search?q=nothing ."""
        r = get("/search?q=nothing")
        self.assertEqual(r.status_code, 200)
        self.assertIn('application/json', r.headers['content-type'])
        self.assertIn('notes', r.json())
        notes = r.json()['notes']
        self.assertEqual(len(notes), 0)

    def test_search_to_get_one(self):
        """Test /search?q=react ."""
        r = get("/search?q=react")
        self.assertEqual(r.status_code, 200)
        self.assertIn('application/json', r.headers['content-type'])
        self.assertIn('notes', r.json())
        notes = r.json()['notes']
        self.assertEqual(len(notes), 1)
        note = notes[0]
        for part in ['title', 'text']:
            self.assertIn(part, note)
        self.assertEqual(note["title"], "react")

    def test_search_prefix_to_get_two(self):
        """Test /search?q=re ."""
        r = get("/search?q=re")
        self.assertEqual(r.status_code, 200)
        self.assertIn('application/json', r.headers['content-type'])
        self.assertIn('notes', r.json())
        notes = r.json()['notes']
        self.assertEqual(len(notes), 2)
        note = notes[0]
        for part in ['title', 'text']:
            self.assertIn(part, note)


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


server_process = None


def start_server():
    """Start NotesApp backend."""
    global server_process
    server_process = subprocess.Popen(["python", "notes_app_server/server.py",
                                       "--use-test-db"])


def wait_server():
    """Wait until server responding."""
    ready = False
    while not ready:
        time.sleep(1)
        try:
            requests.get(URL + "/version")
            ready = True
        except requests.exceptions.ConnectionError:
            pass


def stop_server():
    """Stop NotesApp backend."""
    global server_process
    time.sleep(1)
    subprocess.check_output(["kill", "-s", "SIGINT", str(server_process.pid)])


def run_tests():
    """Run tests and then stop server."""
    check_using_test_db()
    unittest.main(exit=False)


def main():
    """Run the whole thing."""
    start_server()
    wait_server()
    run_tests()
    stop_server()


if __name__ == '__main__':
    main()
