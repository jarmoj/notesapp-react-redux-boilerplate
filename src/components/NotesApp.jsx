import React from 'react';
import NotesList from './NotesList'
import NotesSearch from './NotesSearch'
import SplitPane from "../../node_modules/react-split-pane/lib/SplitPane";
import NotesEdit from './NotesEdit'
import {List, Map} from 'immutable';

const notes_expect = List.of(
  Map({
   id: 'a1', title: 'react', text: 'Stuff about React.',
   timestamp: Map({
     created: 'EEST 1970-10-12 11:33',
     modified: 'EEST 1980-10-12 12:33'
   })
  }),
  Map({
   id: '2e', title: 'redux', text: 'Stuff about Redux.',
   timestamp: Map({
     created: 'EEST 1970-10-12 11:34',
     modified: 'EEST 1980-10-12 12:32'
   })
  }),
  Map({
   id: '3r', title: 'immutable', text: 'Stuff about Immutable.',
   timestamp: Map({
     created: 'EEST 1970-10-12 11:35',
     modified: 'EEST 1980-10-12 12:31'
   })
  })
);

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
  notesSearch(query) {
    this.setState({
      notes: notes,
      editing: notes[0].get('id')
    });
  }
  render() {
    return (
      <div className="notes-app">
        <NotesSearch notesSearch={this.notesSearch.bind(this)}/>
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
