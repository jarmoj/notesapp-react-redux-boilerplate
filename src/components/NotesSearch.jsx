import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';

export default class NotesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentWillReceiveProps(props) {
    if (props.note)
      this.setState({value: props.note.get('title')});
  }
  onSearchEdit(e) {
    this.setQuery(e.target.value);
  }
  setQuery(query) {
    this.setState({value: query});
    this.props.notesSearch(query);
  }
  clearSearch() {
    this.setQuery("");
  }
  render() {
    return (
      <div className="notes-search-border">
        <input
            className="notes-search"
            autoFocus={true}
            type="text"
            value={this.state.value}
            onChange={this.onSearchEdit.bind(this)}
            ref={(c) => this._input = c} />
      </div>
      );
  }
};
