import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin'
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import NotesListItem from './NotesListItem';

export const UP_POINTING = '\u25B3';
export const DOWN_POINTING = '\u25BD';

export class NotesList extends React.Component {

  static get propTypes() {
    return {
      notes: ImmutablePropTypes.list.isRequired,
      selected: React.PropTypes.string,
      orderBy: React.PropTypes.string.isRequired,
      titleHeaderClicked: React.PropTypes.func.isRequired,
      timestampHeaderClicked: React.PropTypes.func.isRequired,
      arrowHeaderClicked: React.PropTypes.func.isRequired,
      selectNote: React.PropTypes.func.isRequired,
      deleteNote: React.PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.titleHeaderOnClickCallback = this.titleHeaderOnClickCallback.bind(this);
    this.timestampHeaderOnClickCallback = this.timestampHeaderOnClickCallback.bind(this);
    this.arrowHeaderOnClickCallback = this.arrowHeaderOnClickCallback.bind(this);
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

    if (this.props.orderBy.indexOf('title') !== -1) {
      return this.orderByTitle(notes);
    } else if (this.props.orderBy.indexOf('modified') !== -1) {
      return this.orderByModified(notes);
    } else if (this.props.orderBy.indexOf('created') !== -1) {
      return this.orderByCreated(notes);
    }
    return this.orderByDefault(notes);
  }

  orderByDefault(notes) {
    return this.orderByModified(notes);
  }

  orderByTitle(notes) {
    if (notes === undefined) {
      return List.of();
    }
    return notes.sortBy(note => note.get('title'));
  }

  orderByModified(notes) {
    if (notes === undefined) {
      return List.of();
    }
    return notes.sortBy(note => new Date(note.getIn(['timestamp', 'modified'])));
  }

  orderByCreated(notes) {
    if (notes === undefined) {
      return List.of();
    }
    return notes.sortBy(note => new Date(note.getIn(['timestamp', 'created'])));
  }

  aDeScending(notes) {
    if (this.props.orderBy === undefined) {
      return notes.reverse();
    }

    if (this.props.orderBy.indexOf('descending') !== -1) {
      return notes.reverse();
    } else if (this.props.orderBy.indexOf('ascending') !== -1) {
      return notes;
    }
    return notes.reverse();
  }

  timestampHeaderText() {
    if (this.props.orderBy === undefined) {
      return 'Modified';
    }

    const parts = this.props.orderBy.split(' ');

    if (parts[0] === 'modified') {
      return 'Modified';
    } else if (parts[0] === 'created') {
      return 'Created';
    }
    return 'Modified';
  }

  arrowHeaderText() {
    if (this.props.orderBy === undefined) {
      return DOWN_POINTING;
    }

    if (this.props.orderBy.indexOf('descending') !== -1) {
      return DOWN_POINTING;
    } else if (this.props.orderBy.indexOf('ascending') !== -1) {
      return UP_POINTING;
    }
    return DOWN_POINTING;
  }

  render() {
    return (
      <div className="notes-list-border">
        <table className="notes-list-rows">
          <thead>
            <tr>
              <th
                className="notes-list-header-title"
                ref={c => this.titleHeader = c} // eslint-disable-line
                onClick={this.titleHeaderOnClickCallback}
              >Title</th>
              <th
                className="notes-list-header-date"
                ref={c => this.timestampHeader = c} // eslint-disable-line
                onClick={this.timestampHeaderOnClickCallback}
              >{this.timestampHeaderText()}</th>
              <th
                className="notes-list-header-destroy"
                ref={c => this.arrowHeader = c} // eslint-disable-line
                onClick={this.arrowHeaderOnClickCallback}
              >{this.arrowHeaderText()}</th>
            </tr>
          </thead>
        </table>
        <div className="notes-list-rows-view scrollable">
          <table className="notes-list-rows">
            <tbody>
              {this.aDeScending(this.orderBy(this.props.notes)).map(item =>
                <NotesListItem
                  key={item.get('title')}
                  ref={c => this.items = (this.items ? this.items.concat([c]) : [c])} // eslint-disable-line
                  title={item.get('title')}
                  text={item.get('text')}
                  timestamp={item.get('timestamp')}
                  orderBy={this.props.orderBy}
                  rowClicked={this.props.selectNote}
                  deleteClicked={this.props.deleteNote}
                  isSelected={this.props.selected === item.get('title')}
                />
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
