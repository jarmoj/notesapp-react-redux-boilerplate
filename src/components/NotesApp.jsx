import React from 'react';
import NotesList from './NotesList'
import NotesSearch from './NotesSearch'
import SplitPane from "../../node_modules/react-split-pane/lib/SplitPane";
import NotesEdit from './NotesEdit'
import {List, Map} from 'immutable';


export default class NotesApp extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: List.of(),
      editing: undefined
    }
  }
  getNote(id) {
    return this.props.notes.find(function(note) {
      return note.get('id') == id;
    });
  }
  notesSearch(notes) {
    if (!notes.length)
      return;

    this.setState({
      notes: notes,
      editing: notes[0].get('id')
    });
  }
  render() {
    return (
      <div className="notes-app">
        <NotesSearch onSearchDone={this.notesSearch.bind(this)}/>
        <div className="contain-absolute">
          <SplitPane split="horizontal" defaultSize="50%">
            <NotesList notes={this.props.notes} />
            <NotesEdit note={this.getNote(this.props.editing)} />
          </SplitPane>
        </div>
      </div>
    );
  }
};
