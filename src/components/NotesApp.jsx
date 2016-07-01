import React from 'react';
import NotesList from './NotesList'
import NotesSearch from './NotesSearch'
import SplitPane from "../../node_modules/react-split-pane/lib/SplitPane";
import NotesEdit from './NotesEdit'

export default class NotesApp extends React.Component {
  getNote(id) {
    return this.props.notes.find(function(note) {
      return note.get('id') == id;
    });
  }
  render() {
    return <div className="root">
      <section className="notes-app">
        <NotesSearch/>
        <SplitPane split="horizontal" defaultSize="50%">
          <NotesList notes={this.props.notes} />
          <NotesEdit note={this.getNote(this.props.editing)} />
        </SplitPane>
      </section>
    </div>
  }
};
