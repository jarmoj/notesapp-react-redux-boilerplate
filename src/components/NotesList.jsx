import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NotesListItem from './NotesListItem';
import {List, Map} from 'immutable';

export default class NotesList extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
            {this.props.notes.map(item =>
                <NotesListItem
                  ref={(c) => this._items = (this._items ? this._items.concat([c]) : [c]) }
                  title={item.get('title')}
                  text={item.get('text')}
                  timestamp={item.get('timestamp')}
                  orderBy={this.props.orderBy}/>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
};
