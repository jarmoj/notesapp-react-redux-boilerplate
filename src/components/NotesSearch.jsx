import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';

export default class NotesSearch extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  onChangeCallback(e) {
    this.props.notesSearch(e.target.value);
  }
  render() {
    return (
      <div className="notes-search-border">
        <input className="notes-search"
               ref={(c) => this._input = c}
               onChange={this.onChangeCallback.bind(this)}/>
      </div>
      );
  }
};
