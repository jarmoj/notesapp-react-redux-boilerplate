import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NotesListItem from './NotesListItem';
import {List, Map} from 'immutable';

export default class NotesList extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  titleHeaderOnClickCallback() {
    if ('titleHeaderClicked' in this.props) {
      this.props.titleHeaderClicked();
    }
  }
  timestampHeaderOnClickCallback() {
    if ('timestampHeaderClicked' in this.props) {
      this.props.timestampHeaderClicked();
    }
  }
  orderBy(notes) {
    if (!('orderBy' in this.props)) {
      return this.orderByDefault(notes);
    }

    if (this.props.orderBy.indexOf('title') != -1) {
      return this.orderByTitle(notes);
    }
    else if (this.props.orderBy.indexOf('modified') != -1) {
      return this.orderByModified(notes);
    }
    else if (this.props.orderBy.indexOf('created') != -1) {
      return this.orderByCreated(notes);
    }
    else {
      return this.orderByDefault(notes);
    }
  }
  orderByDefault(notes) {
    return this.orderByModified(notes);
  }
  orderByTitle(notes) {
    return notes.sortBy(note => {
      return note.get('title');
    });
  }
  orderByModified(notes) {
    return notes.sortBy(note => {
      return note.getIn(['timestamp', 'modified']);
    })
  }
  orderByCreated(notes) {
    return notes.sortBy(note => {
      return note.getIn(['timestamp', 'created']);
    })
  }
  a_de_scending(notes) {
    if (!('orderBy' in this.props)) {
      return notes.reverse();
    }

    if (this.props.orderBy.indexOf('descending') != -1) {
      return notes.reverse();
    }
    else if (this.props.orderBy.indexOf('ascending') != -1) {
      return notes;
    }
    else {
      return notes.reverse();
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
                  onClick={this.titleHeaderOnClickCallback()}>Title</th>
              <th className="notes-list-header-date"
                  ref={c => this._timestampHeader = c}
                  onClick={this.timestampHeaderOnClickCallback()}>Date</th>
              <th className="notes-list-header-destroy">{"\u25BC"}</th>
            </tr>
          </thead>
          <tbody>
            {this.a_de_scending(this.orderBy(this.props.notes)).map(item =>
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
