import React from 'react';

export default class NotesApp extends React.Component {
  getItems() {
    return this.props.notes || [];
  }
  render() {
    return <div>
      <section className="notes-app">
        <section className="main">
          <input className="search-input" type="search" />
          <ul className="notes-list">
            {this.getItems().map(item =>
              <li className="active" key={item.get('text')}>
                <div className="view">
                  <label htmlFor="notesListItem">
                    {item.get('title')} {item.get('modified')}
                  </label>
                  <button className="destroy"></button>
                </div>
              </li>
            )}
          </ul>
        </section>
      </section>
    </div>
  }
};
