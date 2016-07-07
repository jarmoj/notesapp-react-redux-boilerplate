import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import NotesList from './NotesList';
import NotesSearch from './NotesSearch';
import SplitPane from "../../node_modules/react-split-pane/lib/SplitPane";
import NotesEdit from './NotesEdit';
import {List, Map} from 'immutable';
import notes from '../../test/test_data';

const _notes = notes;

export default class NotesApp extends React.Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      notes: _notes,
      notesFiltered: _notes,
      editing: undefined
    };
    document.onkeydown = this.onKeyDown.bind(this);
  }
  componentDidMount() {
    this.notesSearch("");
  }
  getNote(id) {
    if (!id || !this.state.notes)
      return undefined;
    return this.state.notes.find(function(note) {
      return note.get('id') == id;
    });
  }
  tokenize(s) {
    let parts = s.split(" ");
    return parts.filter(function (item) {
      return item.length > 0;
    });
  }
  makeSearch(query) {
    if (query == "")
      return this.state.notes;

    let query_tokens = this.tokenize(query);

    return this.state.notes.filter(function(note) {
      return query_tokens.some(function(token) {
        return note.get('title').indexOf(token) != -1 || note.get('text').indexOf(token) != -1;
      });
    });
  }
  notesSearch(query) {
    const notesGot = this.makeSearch(query);
    if (notesGot.count() > 0) {
      this.setState({
        notesFiltered: notesGot,
        editing: undefined
      });
    }
    else {
      this.setState({
        notesFiltered: List.of(),
        editing: undefined
      });
    }
  }
  onSelect(id) {
    this.setState({ editing: id });
  }
  clearSelection() {
    this.onSelect(undefined);
    this._search.clearSearch();
    ReactDOM.findDOMNode(this._search._input).focus();
  }
  onKeyDown(e) {
    if (e.keyCode == 27)
      this.clearSelection();
  }
  onNoteEdit(id, newText) {
    let note = this.getNote(id);
    let index = this.state.notes.indexOf(note);
    let newNotes = this.state.notes.setIn([index, 'text'], newText);
    this.setState({ notes: newNotes});
  }
  render() {
    return (
      <div className="notes-app">
        <NotesSearch
          query={this.state.query}
          note={this.getNote(this.state.editing)}
          notesSearch={this.notesSearch.bind(this)}
          ref={(c) => this._search = c}/>
        <div className="contain-absolute">
          <SplitPane split="horizontal" defaultSize="50%">
            <NotesList
              notes={this.state.notes}
              notesFiltered={this.state.notesFiltered}
              onSelect={this.onSelect.bind(this)}
              selected={this.state.editing} />
            <NotesEdit
                note={this.getNote(this.state.editing)}
                onEdit={this.onNoteEdit.bind(this)}
                ref={(c) => this._edit = c} />
          </SplitPane>
        </div>
      </div>
    );
  }
};
