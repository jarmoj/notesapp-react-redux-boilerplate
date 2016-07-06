import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';

const notes_expect = List.of(
  Map({
   id: 'a1', title: 'react', text: 'Stuff about React.',
   timestamp: Map({
     created: 'EEST 1970-10-12 11:33',
     modified: 'EEST 1980-10-12 12:33'
   })
  }),
  Map({
   id: '2e', title: 'redux', text: 'Stuff about Redux.',
   timestamp: Map({
     created: 'EEST 1970-10-12 11:34',
     modified: 'EEST 1980-10-12 12:32'
   })
  }),
  Map({
   id: '3r', title: 'immutable', text: 'Stuff about Immutable.',
   timestamp: Map({
     created: 'EEST 1970-10-12 11:35',
     modified: 'EEST 1980-10-12 12:31'
   })
  })
);

export default class NotesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  makeSearch(e) {
    if (e.target.value == "")
      this.props.onSearchDone(notes_expect);
    else
      this.props.onSearchDone(List.of());
    this.setState({value: e.target.value});
  }
  render() {
    return (
      <div className="notes-search-border">
        <input ref="input"
            className="notes-search"
            autoFocus={true}
            type="text"
            value={this.state.value}
            onChange={this.makeSearch.bind(this)} />
      </div>
      );
  }
};
