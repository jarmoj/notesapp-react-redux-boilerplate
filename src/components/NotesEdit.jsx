import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {List, Map} from 'immutable';

export default class NotesEdit extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    if (!this.props.note) {
      return (
        <div className="notes-edit-border">
          <textarea className="notes-edit"/>
        </div>
        );
    }
    else {
      return (
        <div className="notes-edit-border">
          <textarea
            className="notes-edit"
            value={this.props.note.get('text')}
            ref={(c) => this._textarea = c} />
        </div>
        );
    }
  }
};
