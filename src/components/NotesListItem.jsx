import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class NotesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
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
