===================================================
 A Simple NotesApp Backend - Python Implementation
===================================================

A simple Tornado server that implements a tiny REST API for adding notes and
searching them.


----------
 REST API
----------

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
