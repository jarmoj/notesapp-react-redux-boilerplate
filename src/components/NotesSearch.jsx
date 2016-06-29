import React from 'react';

export default class NotesSearch extends React.Component {
  render() {
    return <input className="notes-search"
                  autoFocus={true}
                  type="text" />
  }
};
