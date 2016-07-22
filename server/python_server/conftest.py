"""Configure pytest to start, and stop the server around tests."""
import pytest
import subprocess
import time
import sys

sys.path.append("test")
import test_server

@pytest.fixture(scope="session", autouse=True)
def start_server(request):
    """Start the server and add finalizer to stop it."""
    test_server.start_server()
    test_server.wait_server()
    test_server.check_using_test_db()
    request.addfinalizer(test_server.stop_server)
    # proc = subprocess.Popen(["python", "notes_app_server/server.py",
    #                          "--use-test-db"], stdout=subprocess.PIPE,
    #                          stdin=subprocess.PIPE)
    # request.addfinalizer(proc.terminate)
