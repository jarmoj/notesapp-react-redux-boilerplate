import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {List, Map} from 'immutable';

export default class NotesEdit extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = this.stateValueFromProps(props);
  }
  componentWillReceiveProps(props) {
    this.setState(this.stateValueFromProps(props));
  }
  stateValueFromProps(props) {
    if (props.selected === undefined || !props.selected) {
      return { value: "" };
    }

    const noteIndex = props.notes.findIndex(note => note.get("title") == props.selected);
    const note = props.notes.get(noteIndex);
    return { value: note.get("text") };
  }
  onChangeCallback(e) {
    this.setState({ value: e.target.value });
    this.props.noteEdited(e.target.value);
  }
  isDisabled() {
    if (this.props.selected === undefined || !this.props.selected) {
      return ' disabled';
    }

    return '';
  }
  focus() {
    this._textarea.focus();
  }
  render() {
    return (
      <div className="notes-edit-border">
        <textarea className={"notes-edit" + this.isDisabled()}
                  ref={(c) => this._textarea = c}
                  value={this.state.value}
                  onChange={this.onChangeCallback.bind(this)}/>
      </div>
    );
  }
};
