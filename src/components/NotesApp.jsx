import React from 'react';
import NotesList from './NotesList'

export default class NotesApp extends React.Component {
  render() {
    return <div>
      <section className="notes-app">
        <input className="notes-search" type="search" />
        <NotesList notes={this.props.notes} />
      </section>
    </div>
  }
};
