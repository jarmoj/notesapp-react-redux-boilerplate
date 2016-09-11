import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'lodash';

const BACKSPACE = 8;
const ENTER = 13;
const ESCAPE = 27;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

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
      lastQuery: '',
      sinceLastType: Number(new Date()),
    };

    this.search = this.search.bind(this);
    this.search = _.debounce(this.search, 50);

    this.complete = this.complete.bind(this);
    // this.complete = _.debounce(this.complete, 100);

    this.onChangeCallback = this.onChangeCallback.bind(this);
    this.onKeyDownCallback = this.onKeyDownCallback.bind(this);
    this.onKeyUpCallback = this.onKeyUpCallback.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.query === this.state.query
      && newProps.selected === this.state.value) {
      return;
    }
    if (this.millisecondsSinceLastType() < 500) {
      this.complete(newProps);
    }
  }

  shouldComponentUpdate(newProps, newState) {
    console.log(newProps);
    console.log(newState);
    if (newProps.query === newProps.lastQuery) {
      return false;
    }
    if (newState.value !== this.state.value) {
      return true;
    }
    if (newState.query !== this.state.value) {
      return true;
    }
  //   return false;
  // }
  //   if (Number(new Date()) - this.state.sinceLastType < 100) {
  //     return false;
  //   }
  //   if ((newProps.query !== newState.query
  //     || newProps.selected !== newState.selected)) {
  //     return true;
  //   }
  //  return false;
    return true;
  }

  componentDidUpdate() {
    if (document.activeElement === this.input
      && this.props.selected
      && this.state.query.length !== this.state.value.length) {
      this.input.selectionStart = this.state.query.length;
      this.input.selectionEnd = this.state.value.length;
    }
  }

  onKeyUpCallback(e) {
    switch (e.keyCode) {
      case ENTER:
        this.returnPressed();
        break;
      case ESCAPE:
        this.escapePressed();
        break;
      default:
        break;
    }
  }

  onKeyDownCallback(e) {
    this.setState({ sinceLastType: Number(new Date()) });
    switch (e.keyCode) {
      case BACKSPACE:
        this.backspacePressed(e);
        break;
      case LEFT_ARROW:
        this.leftArrowPressed(e);
        break;
      case RIGHT_ARROW:
        this.rightArrowPressed(e);
        break;
      default:
        break;
    }
  }

  onChangeCallback(e) {
    const query = e.target.value;
    if (this.state.query !== query
      && this.state.value.startsWith(query)) {
      this.setState({
        query,
      });
    } else {
      this.setState({
        value: query,
        query,
      });
    }
    this.search(query);
  }

  millisecondsSinceLastType() {
    return Number(new Date()) - this.state.sinceLastType;
  }

  complete(newProps) {
    const query = newProps.query;
    const selected = newProps.selected ? newProps.selected : query;
    let value = query;
    if (selected.startsWith(query)
      && query.startsWith(this.state.query)) {
      value = selected;
    }
    this.setState({
      value,
      query,
    });
  }

  backspacePressed() {
    let selectionStart = this.input.selectionStart;
    if (selectionStart == this.input.selectionEnd) {
      selectionStart--;
    }
    const left = this.state.value.substring(0, selectionStart);
    const right = this.state.value.substring(this.input.selectionEnd, this.state.value.length);
    const newValue = left + right;
    this.setState({
      value: newValue,
      query: newValue,
    });
    this.input.selectionEnd = selectionStart;
    e.preventDefault();
  }

  rightArrowPressed(e) {
    if (e.shiftKey
      || this.input.selectionStart === this.input.selectionEnd) {
      return;
    }
    this.setState({
      value: this.state.value,
      query: this.state.value,
    });
    this.input.selectionStart = this.input.selectionEnd;
    e.preventDefault();
  }

  leftArrowPressed(e) {
    if (e.shiftKey
      || this.input.selectionStart === this.input.selectionEnd) {
      return;
    }
    this.setState({
      value: this.state.value,
      query: this.state.value,
    });
    this.input.selectionEnd = this.input.selectionStart;
    e.preventDefault();
  }

  returnPressed() {
    this.setState({
      value: this.state.value,
      query: this.state.value,
    });
    this.search(this.state.value);
    this.props.returnPressed(this.state.value);
  }

  escapePressed() {
    this.onChangeCallback({ target: { value: '' } });
  }

  focus() {
    this.input.focus();
  }

  search(query) {
    if (this.state.lastQuery !== query
      || this.state.query !== query) {
      this.props.search(query);
    }
    this.setState({
      lastQuery: query,
    });
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
