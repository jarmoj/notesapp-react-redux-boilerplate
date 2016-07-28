import React from 'react';
import {bindActionCreators} from 'redux';
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
    this.setUpKeyboardHandling();
  }
  setUpKeyboardHandling() {
    window.onkeydown = (e) => {
      switch(e.keyCode) {
        case 27:
          this.escapePressed();
          break;
      }
    }
  }
  escapePressed() {
    this.props.clearSelection();
    this._search.focus();
    this.setAscendingDescendingToDefault();
  }
  setAscendingDescendingToDefault() {
    if (this.props.orderBy.split(" ")[1] == "ascending") {
        this.props.toggleAcendingDescending();
    }
  }
  orderByTimestamp() {
    if (this.props.orderByCreated === undefined) {
      return;
    }

    if (this.props.orderByModified === undefined) {
      return;
    }

    if (this.props.orderBy.split(" ")[0] == "modified") {
      this.props.orderByCreated();
    }
    else {
      this.props.orderByModified();
    }
  }
  render() {
    return (
      <div className="notes-app">
        <NotesSearch
          query={this.props.query}
          search={this.props.search}
          selected={this.props.selected}
          ref={c => this._search = c}/>
        <div className="contain-absolute">
          <SplitPane split="horizontal" defaultSize="50%">
            <NotesList
              notes={this.props.notes}
              orderBy={this.props.orderBy}
              selected={this.props.selected}
              titleHeaderClicked={this.props.orderByTitle}
              timestampHeaderClicked={this.orderByTimestamp.bind(this)}
              arrowHeaderClicked={this.props.toggleAcendingDescending}
              selectNote={this.props.selectNote}
              deleteNote={this.props.deleteNote}
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

const mapDispatchToProps = (dispatch) => {
  return {
    searchNotes: bindActionCreators(actionCreators.searchNotes, dispatch),
    setState: bindActionCreators(actionCreators.setState, dispatch),
    setQuery: bindActionCreators(actionCreators.setQuery, dispatch),
    setNotes: bindActionCreators(actionCreators.setNotes, dispatch),
    search: bindActionCreators(actionCreators.search, dispatch),
    addNote: bindActionCreators(actionCreators.addNote, dispatch),
    selectNote: bindActionCreators(actionCreators.selectNote, dispatch),
    clearSelection: bindActionCreators(actionCreators.clearSelection, dispatch),
    editNote: bindActionCreators(actionCreators.editNote, dispatch),
    deleteNote: bindActionCreators(actionCreators.deleteNote, dispatch),
    orderByTitle: bindActionCreators(actionCreators.orderByTitle, dispatch),
    orderByModified: bindActionCreators(actionCreators.orderByModified, dispatch),
    orderByCreated: bindActionCreators(actionCreators.orderByCreated, dispatch),
    toggleAcendingDescending: bindActionCreators(actionCreators.toggleAcendingDescending, dispatch)
  }
};

export const NotesAppContainer = connect(mapStateToProps, mapDispatchToProps)(NotesApp);
