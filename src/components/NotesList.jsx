import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NotesListItem from './NotesListItem';

export default class NotesList extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return <section className="main">
      <ul className="notes-list">
        {this.props.notes.map(item =>
          <NotesListItem key={item.get('id')}
                         title={item.get('title')}
                         text={item.get('text')}
                         timestamp={item.get('timestamp')}/>

        )}
      </ul>
    </section>
  }
};
