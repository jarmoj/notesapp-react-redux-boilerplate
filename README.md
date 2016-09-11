# Notes App - React - Redux

(under work)

This is a Notes App that got its inspiration from Notational Velocity, nvALT,
Simplenote, and other such note taking tools. I used the project as a climbing
tree to latest web stack and especially to React and Redux.

## Some of the used technology so far

- Babel
- Webpack

- React
- Redux
- ImmutableJS
- Axios

- Css-loader
- Sass-loader
- Style-loader

- Mocha
- Chai
- Enzyme
- Jsdom

- Python backend



## Used References

At first I started Following the following tutorial(s) somewhat:

"Getting Started with React, Redux and Immutable: a Test-Driven Tutorial
(Part 1)" - Nicolas Goutay :

http://www.theodo.fr/blog/2016/03/getting-started-with-react-redux-and-immutable-a-test-driven-tutorial-part-1/

Who in turn followed :

"A Comprehensive Guide to Test-First Development with Redux, React, and
Immutable" - Tero Parviainen :

http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html

At some point I felt confident about my setup and the development diverged from
those examples.



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
  selected

## UI for the app

We split the app into following components:

- NotesApp
  - NotesHeader
  - NotesSearch
  - NotesList
    - NotesListItem
  - NotesEdit
  - NotesFooter
