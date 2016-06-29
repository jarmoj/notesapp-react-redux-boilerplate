import React from 'react';
import NotesList from './NotesList'
import NotesSearch from './NotesSearch'

export default class NotesApp extends React.Component {
  render() {
    return <div>
      <section className="notes-app">
        <NotesSearch/>
        <NotesList notes={this.props.notes} />
      </section>
    </div>
  }
};
