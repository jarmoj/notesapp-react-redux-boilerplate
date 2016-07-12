import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NotesListItem from './NotesListItem';
import {List, Map} from 'immutable';

export default class NotesList extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  onClickCallback() {
    if ('titleHeaderClicked' in this.props) {
      this.props.titleHeaderClicked();
    }
  }
  render() {
    return (
      <div className="notes-list-border">
        <table className="notes-list-rows">
          <thead>
            <tr>
              <th className="notes-list-header-title"
                  ref={c => this._titleHeader = c}
                  onClick={this.onClickCallback()}>Title</th>
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
                  orderBy={this.props.orderBy}
                  rowClicked={this.props.noteClicked}/>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
};
