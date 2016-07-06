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
  onQueryChanged(e) {
    this.setState({value: e.target.value});
    this.props.notesSearch(e.target.value);
  }
  render() {
    return (
      <div className="notes-search-border">
        <input ref="input"
            className="notes-search"
            autoFocus={true}
            type="text"
            value={this.state.value}
            onChange={this.onQueryChanged.bind(this)} />
      </div>
      );
  }
};
