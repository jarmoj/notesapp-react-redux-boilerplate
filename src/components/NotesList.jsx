import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import NotesListItem from './NotesListItem';

export default class NotesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: 'modified'
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  getNotes() {
    let that = this;
    if (this.props.notes) {
      return this.props.notes.sort(function(noteA, noteB) {
        return noteA.get('timestamp')[that.props.orderBy] < noteB.get('timestamp')[that.props.orderBy];
      });
    }
    return [];
  }
  render() {
    return <section className="main">
      <ul className="notes-list">
        {this.getNotes().map(item =>
          <NotesListItem key={item.get('id')}
                         title={item.get('title')}
                         text={item.get('text')}
                         timestamp={item.get('timestamp')}/>

        )}
      </ul>
    </section>
  }
};
