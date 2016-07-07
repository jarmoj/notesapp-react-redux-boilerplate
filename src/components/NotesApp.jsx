import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import NotesList from './NotesList';
import NotesSearch from './NotesSearch';
import SplitPane from "../../node_modules/react-split-pane/lib/SplitPane";
import NotesEdit from './NotesEdit';
import {List, Map} from 'immutable';

const _notes = List.of(
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
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      notes: undefined,
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
      return _notes;

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
        notes: notesGot,
        editing: undefined
      });
    }
    else {
      this.setState({
        notes: List.of(),
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
  render() {
    return (
      <div className="notes-app">
        <NotesSearch notesSearch={this.notesSearch.bind(this)} ref={(c) => this._search = c}/>
        <div className="contain-absolute">
          <SplitPane split="horizontal" defaultSize="50%">
            <NotesList
              notes={this.state.notes}
              onSelect={this.onSelect.bind(this)}
              selected={this.state.editing} />
            <NotesEdit note={this.getNote(this.state.editing)} />
          </SplitPane>
        </div>
      </div>
    );
  }
};
