import React from 'react';
import NotesListItem from './NotesListItem';

export default class NotesList extends React.Component {
  render() {
    return <section className="main">
      <ul className="notes-list">
        {this.props.notes.map(item =>
          <NotesListItem key={item.get('id')}
                         title={item.get('title')}
                         text={item.get('text')}
                         created={item.get('created')}
                         modified={item.get('modified')}/>
        )}
      </ul>
    </section>
  }
};
