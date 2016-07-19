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
      query: ''
    };
  }
  onChangeCallback(e) {
    this.setState({ query: e.target.value });
    this.props.setQuery(e.target.value);
  }
  render() {
    return (
      <div className="notes-search-border">
        <input className="notes-search"
               ref={(c) => this._input = c}
               value={this.state.query}
               onChange={this.onChangeCallback.bind(this)}/>
      </div>
      );
  }
};
