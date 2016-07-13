import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/index';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SplitPane from "../../node_modules/react-split-pane/lib/SplitPane";
import NotesSearch from '../components/NotesSearch';
import {NotesList} from '../components/NotesList';
import NotesEdit from '../components/NotesEdit';
import {List, Map} from 'immutable';

export class NotesApp extends React.Component {
  constructor() {
    super();
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="notes-app">
        <NotesSearch
          ref={c => this._search = c}/>
        <div className="contain-absolute">
          <SplitPane split="horizontal" defaultSize="50%">
            <NotesList
              {...this.props}
              ref={c => this._list = c}/>
            <NotesEdit/>
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
