import React from 'react';

export default class NotesListItem extends React.Component {
  render() {
    return <li className="notes-list-item">
      <div className="view">
        <label htmlFor="notesListItem">
          {this.props.title} {this.props.modified}
        </label>
        <button className="destroy"></button>
      </div>
    </li>
  }
};
