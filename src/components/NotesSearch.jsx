import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';
import { setQuery } from '../actions/index';

export class NotesSearch extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: props.query
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({ value: newProps.query });
  }
  onChangeCallback(e) {
    this.setState({ value: e.target.value });
    this.props.search(e.target.value);
  }
  focus() {
    this._input.focus();
  }
  onKeyUpCallback(e) {
    if (e.keyCode == 13) {
      this.props.returnPressed();
    }
  }
  render() {
    return (
      <div className="notes-search-border">
        <input
          type="text"
          className="notes-search"
          ref={(c) => this._input = c}
          value={this.state.value}
          onChange={this.onChangeCallback.bind(this)}
          onKeyUp={this.onKeyUpCallback.bind(this)}/>
      </div>
      );
  }
};
