import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'lodash';

export default class NotesSearch extends React.Component {

  static get propTypes() {
    return {
      query: React.PropTypes.string.isRequired,
      selected: React.PropTypes.string,
      search: React.PropTypes.func.isRequired,
      returnPressed: React.PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: props.query,
      query: props.query,
      last_query: '',
    };

    this.search = this.search.bind(this);
    this.search_fast = _.debounce(this.search, 100);
    this.search_slow = _.debounce(this.search, 500);
    this.search = this.search_fast;

    this.onChangeCallback = this.onChangeCallback.bind(this);
    this.onKeyDownCallback = this.onKeyDownCallback.bind(this);
    this.onKeyUpCallback = this.onKeyUpCallback.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const query = newProps.query;
    const selected = newProps.selected ? newProps.selected : query;
    const value = selected.startsWith(query) ? selected : query;
    this.setState({
      value,
      query,
    });
  }

  componentDidUpdate() {
    if (document.activeElement === this.input) {
      this.input.selectionStart = this.state.query.length;
      this.input.selectionEnd = this.state.value.length;
    }
  }

  onKeyUpCallback(e) {
    if (e.keyCode === 13) {
      this.returnPressed();
    }
  }

  onKeyDownCallback(e) {
    this.search = this.search_fast;
    if (e.keyCode === 8) {
      this.search = this.search_slow;
    }
  }

  onChangeCallback(e) {
    const query = e.target.value;
    this.setState({
      value: query,
      query,
    });
    if (this.state.last_query !== query) {
      this.search(query);
      this.setState({
        last_query: query,
      });
    }
  }

  returnPressed() {
    this.setState({
      value: this.state.value,
      query: this.state.value,
    });
    this.props.returnPressed();
  }

  focus() {
    this.input.focus();
  }

  search(query) {
    this.props.search(query);
  }

  render() {
    return (
      <div className="notes-search-border">
        <input
          type="text"
          className="notes-search"
          ref={c => this.input = c} // eslint-disable-line
          value={this.state.value}
          onChange={this.onChangeCallback}
          onKeyUp={this.onKeyUpCallback}
          onKeyDown={this.onKeyDownCallback}
        />
      </div>
      );
  }
}
