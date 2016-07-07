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
    return List.of();
  }
  render() {
    return (
      <div className="notes-list-border">
        <table className="notes-list-rows">
          <thead>
            <tr>
              <th className="notes-list-header-title">Title</th>
              <th className="notes-list-header-date">Date</th>
              <th className="notes-list-header-destroy">{"\u25BC"}</th>
            </tr>
          </thead>
          <tbody>
            {this.getNotes().map((item, index) =>
              <NotesListItem key={item.get('id')}
                             id={item.get('id')}
                             title={item.get('title')}
                             text={item.get('text')}
                             timestamp={item.get('timestamp')}
                             orderBy={this.state.orderBy}
                             onSelect={this.props.onSelect}
                             selected={item.get('id') == this.props.selected}/>
              )}
          </tbody>
        </table>
      </div>
    );
  }
};
