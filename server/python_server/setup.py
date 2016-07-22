"""NotesApp setup.py file."""
import os
from setuptools import setup


def read(fname):
    """Read file in as string."""
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(name="NotesApp python backend",
      version="0.0.1",
      author="Jarmo Jomppanen",
      author_email="tdatda@gmail.com",
      description="A NotesApp backend with simple REST API",
      license="MIT",
      keywords="notes app backend",
      packages=['notes_app_server', 'test'],
      long_description=read('README.txt'),
      install_requires=[
        "requests",
        "tornado>=4.3",
        "pytest",
      ],)
