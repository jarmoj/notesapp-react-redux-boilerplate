import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';
import { setQuery } from '../actions/index';
import _ from 'lodash';

export class NotesSearch extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: props.query,
      query: props.query,
      last_query: "",
    };

    this.search_fast = _.debounce(this.search, 100);
    this.search_slow = _.debounce(this.search, 500);
    this.search = this.search_fast;
  }
  componentWillReceiveProps(newProps) {
    const query = newProps.query;
    const selected = newProps.selected ? newProps.selected : query;
    const value = selected;
    this.setState({
      value: value,
      query: query
    });
  }
  onChangeCallback(e) {
    const query = e.target.value;
    this.setState({
      value: query,
      query: query
    });
    if (this.state.last_query != query) {
      this.search(query);
      this.setState({
        last_query: query
      });
    }
  }
  search(query) {
    this.props.search(query);
  }
  focus() {
    this._input.focus();
  }
  onKeyDownCallback(e) {
    this.search = this.search_fast;
    if (e.keyCode == 8) {
      this.search = this.search_slow;
    }
  }
  onKeyUpCallback(e) {
    if (e.keyCode == 13) {
      this.returnPressed();
    }
  }
  returnPressed() {
    this.setState({
      value: this.state.value,
      query: this.state.value
    });
    this.props.returnPressed();
  }
  componentDidUpdate() {
    if (document.activeElement == this._input) {
      this._input.selectionStart = this.state.query.length;
      this._input.selectionEnd = this.state.value.length;
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
          onKeyUp={this.onKeyUpCallback.bind(this)}
          onKeyDown={this.onKeyDownCallback.bind(this)}/>
      </div>
      );
  }
};
