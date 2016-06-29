# React Redux - NotesMVC

Like TodoMVC but for taking and searching notes like in Notational Velocity or
nvALT.

Following the tutorial(s) somewhat:

"Getting Started with React, Redux and Immutable: a Test-Driven Tutorial
(Part 1)" - Nicolas Goutay :

http://www.theodo.fr/blog/2016/03/getting-started-with-react-redux-and-immutable-a-test-driven-tutorial-part-1/

Who in turn followed :

"A Comprehensive Guide to Test-First Development with Redux, React, and
Immutable" - Tero Parviainen :

http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html

## Building a State Tree

Our app is composed of notes:

state
  notes
    item
      id
      title
      text
      timestamp
        added
        modified
    item
    ...
  filter (search)
  editing

## UI for the app

We split the app into following components:

- NotesApp
  - NotesHeader
  - NotesSearch
  - NotesList
    - NotesListItem
  - NotesEdit
  - NotesFooter
