import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {List, Map} from 'immutable';

export default class NotesEdit extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: props.note ? props.note.get('text') : ""
    };
  }
  onEditText(e) {
    this.setNoteText(e.target.value);
  }
  setNoteText(newText) {
    this.setState({value: newText});
    this.props.onEdit(this.props.note.get('id'), newText);
  }
  render() {
    if (!this.props.note) {
      return (
        <div className="notes-edit-border">
          <textarea className="notes-edit" disabled="true"/>
        </div>
        );
    }
    else {
      return (
        <div className="notes-edit-border">
          <textarea
            className="notes-edit"
            value={this.state.value}
            onChange={this.onEditText.bind(this)}
            ref={(c) => this._textarea = c} />
        </div>
        );
    }
  }
};
