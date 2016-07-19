import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SplitPane from "../../node_modules/react-split-pane/lib/SplitPane";
import {NotesSearch} from '../components/NotesSearch';
import {NotesList} from '../components/NotesList';
import NotesEdit from '../components/NotesEdit';
import {List, Map} from 'immutable';

export class NotesApp extends React.Component {
  constructor() {
    super();
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  searchNotes(query) {
    if (query == "") {
      return this.props.notes;
    }
    else {
      return this.props.notes.filter(note => {
        return this.itemMatchesQuery(query, note.get('title'))
            || this.itemMatchesQuery(query, note.get('text'));
      });
    }
  }
  itemMatchesQuery(query, item) {
    const queryTokens = this.tokenize(query);
    return queryTokens.every(token => {
      return item.indexOf(token) != -1;
    });
  }
  tokenize(s) {
    return List.of(s.split(" ")).filter(token => {
      return token.length > 0;
    });
  }
  render() {
    return (
      <div className="notes-app">
        <NotesSearch
          setQuery={this.props.setQuery}
          ref={c => this._search = c}/>
        <div className="contain-absolute">
          <SplitPane split="horizontal" defaultSize="50%">
            <NotesList
              {...this.props}
              ref={c => this._list = c}/>
            <NotesEdit
              {...this.props}
              ref={c => this._edit = c}/>
          </SplitPane>
        </div>
      </div>
    );
  }
};

export function mapStateToProps(state) {
  return {
    query: state.get('query'),
    notes: state.get('notes'),
    selected: state.get('selected'),
    orderBy: state.get('orderBy')
  }
}

export const NotesAppContainer = connect(mapStateToProps, actionCreators)(NotesApp);
