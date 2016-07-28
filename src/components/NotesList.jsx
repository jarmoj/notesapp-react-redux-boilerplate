import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NotesListItem from './NotesListItem';
import {List, Map} from 'immutable';

export const UP_POINTING = "\u25B3";
export const DOWN_POINTING = "\u25BD";

export class NotesList extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  titleHeaderOnClickCallback() {
    if (this.props.titleHeaderClicked !== undefined) {
      this.props.titleHeaderClicked();
    }
  }
  timestampHeaderOnClickCallback() {
    if (this.props.timestampHeaderClicked !== undefined) {
      this.props.timestampHeaderClicked();
    }
  }
  arrowHeaderOnClickCallback() {
    if (this.props.arrowHeaderClicked !== undefined) {
      this.props.arrowHeaderClicked();
    }
  }
  orderBy(notes) {
    if (this.props.orderBy === undefined) {
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
    if (notes === undefined)
      return List.of();
    return notes.sortBy(note => {
      return note.get('title');
    });
  }
  orderByModified(notes) {
    if (notes === undefined)
      return List.of();
    return notes.sortBy(note => {
      return note.getIn(['timestamp', 'modified']);
    })
  }
  orderByCreated(notes) {
    if (notes === undefined)
      return List.of();
    return notes.sortBy(note => {
      return note.getIn(['timestamp', 'created']);
    })
  }
  a_de_scending(notes) {
    if (this.props.orderBy === undefined) {
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
  timestampHeaderText() {
    if (this.props.orderBy === undefined ) {
      return 'Modified';
    }

    const parts = this.props.orderBy.split(" ");

    if (parts[0] == "modified") {
      return 'Modified';
    }
    else if (parts[0] == "created") {
      return 'Created';
    }
    else {
      return 'Modified';
    }
  }
  arrowHeaderText() {
    if (this.props.orderBy === undefined) {
      return DOWN_POINTING;
    }

    if (this.props.orderBy.indexOf('descending') != -1) {
      return DOWN_POINTING;
    }
    else if (this.props.orderBy.indexOf('ascending') != -1) {
      return UP_POINTING;
    }
    else {
      return DOWN_POINTING;
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
                  onClick={this.titleHeaderOnClickCallback.bind(this)}>Title</th>
              <th className="notes-list-header-date"
                  ref={c => this._timestampHeader = c}
                  onClick={this.timestampHeaderOnClickCallback.bind(this)}>{this.timestampHeaderText()}</th>
              <th className="notes-list-header-destroy"
                  ref={c => this._arrowHeader = c}
                  onClick={this.arrowHeaderOnClickCallback.bind(this)}>{this.arrowHeaderText()}</th>
            </tr>
          </thead>
        </table>
        <div className="notes-list-rows-view scrollable">
          <table className="notes-list-rows">
            <tbody>
              {this.a_de_scending(this.orderBy(this.props.notes)).map(item =>
                  <NotesListItem
                    key={item.get('title')}
                    ref={(c) => this._items = (this._items ? this._items.concat([c]) : [c]) }
                    title={item.get('title')}
                    text={item.get('text')}
                    timestamp={item.get('timestamp')}
                    orderBy={this.props.orderBy}
                    rowClicked={this.props.selectNote}
                    selected={this.props.selected == item.get('title')}/>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
