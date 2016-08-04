import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class NotesEdit extends React.Component {

  static get propTypes() {
    return {
      noteEdited: React.PropTypes.func.isRequired,
      selected: React.PropTypes.string,
    };
  }

  constructor(props) {
    super(props);
    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: '',
      enabled: false,
    };

    this.onChangeCallback = this.onChangeCallback.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState(this.stateValueFromProps(props));
  }

  onChangeCallback(e) {
    this.setState({ value: e.target.value });
    this.props.noteEdited(e.target.value);
  }

  stateValueFromProps(props) {
    const note = this.findSelectedNote(props);
    if (!props.selected || !note) {
      return {
        value: '',
      };
    }
    return {
      value: note.get('text'),
    };
  }

  findSelectedNote(props) {
    const noteIndex = props.notes.findIndex(note => note.get('title') === props.selected);
    const note = props.notes.get(noteIndex);
    return note;
  }

  isDisabled() {
    if (this.props.selected || this.state.enabled) {
      return '';
    }
    return ' disabled';
  }

  focus() {
    this.textarea.focus();
  }

  render() {
    return (
      <div className="notes-edit-border">
        <textarea
          className={'notes-edit' + this.isDisabled()} // eslint-disable-line
          ref={c => this.textarea = c} // eslint-disable-line
          value={this.state.value}
          onChange={this.onChangeCallback}
        />
      </div>
    );
  }
}
