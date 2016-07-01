import React from 'react';
import NotesList from './NotesList'
import NotesSearch from './NotesSearch'
import SplitPane from "../../node_modules/react-split-pane/lib/SplitPane";

export default class NotesApp extends React.Component {
  render() {
    return <div className="root">
      <section className="notes-app">
        <NotesSearch/>
        <SplitPane split="horizontal" defaultSize="50%">
          <NotesList notes={this.props.notes} />
          <div>Editor</div>
        </SplitPane>
      </section>
    </div>
  }
};
