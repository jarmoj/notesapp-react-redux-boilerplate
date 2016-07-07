import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SplitPane from "../../node_modules/react-split-pane/lib/SplitPane";
import NotesSearch from '../components/NotesSearch';
import NotesList from '../components/NotesList';
import NotesEdit from '../components/NotesEdit';
import {List, Map} from 'immutable';
import _start_state from '../../test/test_data';

export default class NotesApp extends React.Component {
  constructor() {
    super();
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = _start_state;
  }
  render() {
    return (
      <div className="notes-app">
        <NotesSearch/>
        <div className="contain-absolute">
          <SplitPane split="horizontal" defaultSize="50%">
            <NotesList/>
            <NotesEdit/>
          </SplitPane>
        </div>
      </div>
    );
  }
};
