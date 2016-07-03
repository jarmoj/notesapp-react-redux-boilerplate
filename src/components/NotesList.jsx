import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NotesListItem from './NotesListItem';
import {List, Map} from 'immutable';

export default class NotesList extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      notes: props.notes || List.of(),
      orderBy: props.orderBy || 'modified',
    };
  }
  getNotes() {
    let that = this;
    if (this.props.notes) {
      return this.props.notes.sort(function(noteA, noteB) {
        return noteA.get('timestamp')[that.state.orderBy] < noteB.get('timestamp')[that.state.orderBy];
      });
    }
    return [];
  }
  render() {
    return (
      <div className="notes-list-border">
        <table className="notes-list-rows">
          {this.getNotes().map((item, index) =>
            <NotesListItem isOddRow={index&1} key={item.get('id')}
                           title={item.get('title')}
                           text={item.get('text')}
                           timestamp={item.get('timestamp')}
                           orderBy={this.state.orderBy} />
            )}
        </table>
      </div>
    );
  }
};
