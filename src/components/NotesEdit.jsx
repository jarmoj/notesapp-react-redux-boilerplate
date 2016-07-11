import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {List, Map} from 'immutable';

export default class NotesEdit extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  onChangeCallback(e) {
    this.props.noteEdited(e.target.value);
  }
  render() {
    return (
      <div className="notes-edit-border">
        <textarea className="notes-edit"
                  ref={(c) => this._input = c}
                  onChange={this.onChangeCallback.bind(this)} />
      </div>
    );
  }
};
