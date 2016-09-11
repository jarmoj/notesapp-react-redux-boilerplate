import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as actionCreators from '../actions/index';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import SplitPane from '../../node_modules/react-split-pane/lib/SplitPane';
import NotesSearch from '../components/NotesSearch';
import { NotesList } from '../components/NotesList';
import NotesEdit from '../components/NotesEdit';

export class NotesApp extends React.Component {

  static get propTypes() {
    return {
      query: React.PropTypes.string.isRequired,
      notes: ImmutablePropTypes.list.isRequired,
      selected: React.PropTypes.string,
      orderBy: React.PropTypes.string.isRequired,
      toggleAscendingDescending: React.PropTypes.func.isRequired,
      clearSelection: React.PropTypes.func.isRequired,
      orderByTitle: React.PropTypes.func.isRequired,
      orderByModified: React.PropTypes.func.isRequired,
      orderByCreated: React.PropTypes.func.isRequired,
      addNote: React.PropTypes.func.isRequired,
      editNote: React.PropTypes.func.isRequired,
      search: React.PropTypes.func.isRequired,
      selectNote: React.PropTypes.func.isRequired,
      deleteNote: React.PropTypes.func.isRequired,
    };
  }

  constructor() {
    super();
    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.setUpKeyboardHandling();

    this.returnPressed = this.returnPressed.bind(this);
    this.orderByTimestamp = this.orderByTimestamp.bind(this);
    this.noteEdited = this.noteEdited.bind(this);
  }

  componentWillMount() {
    this.noteEdited = _.debounce(this.noteEdited, 1000);
  }

  componentDidMount() {
    this.search.focus();
  }

  setUpKeyboardHandling() {
    window.onkeydown = (e) => {
      switch (e.keyCode) {
        case 27:
          this.escapePressed();
          break;
        default:
          break;
      }
    };
  }

  setOrderToDefault() {
    this.props.orderByTitle();
    if (this.props.orderBy.split(' ')[1] === 'descending') {
      this.props.toggleAscendingDescending();
    }
  }

  orderByTimestamp() {
    if (this.props.orderByCreated === undefined) {
      return;
    }

    if (this.props.orderByModified === undefined) {
      return;
    }

    if (this.props.orderBy.split(' ')[0] === 'modified') {
      this.props.orderByCreated();
    } else {
      this.props.orderByModified();
    }
  }

  escapePressed() {
    this.noteEdited.flush();

    if (this.props.query === '') {
      this.setOrderToDefault();
    }

    this.props.clearSelection();
    this.search.focus();
  }

  returnPressed(query) {
    if (this.props.selected !== query) {
      this.props.addNote(query, '');
    } else {
      this.props.selectNote(query);
    }

    if (this.edit) {
      this.edit.focus();
    }
  }

  noteEdited(text) {
    if (this.props.selected) {
      this.props.editNote(this.props.selected, this.props.selected, text);
    }
  }

  render() {
    return (
      <div className="notes-app">
        <NotesSearch
          query={this.props.query}
          search={this.props.search}
          notes={this.props.notes}
          selected={this.props.selected}
          ref={c => this.search = c} // eslint-disable-line
          returnPressed={this.returnPressed}
        />
        <div className="contain-absolute">
          <SplitPane split="horizontal" defaultSize="50%">
            <NotesList
              notes={this.props.notes}
              orderBy={this.props.orderBy}
              selected={this.props.selected}
              titleHeaderClicked={this.props.orderByTitle}
              timestampHeaderClicked={this.orderByTimestamp}
              arrowHeaderClicked={this.props.toggleAscendingDescending}
              selectNote={this.props.selectNote}
              deleteNote={this.props.deleteNote}
              ref={c => this.list = c} // eslint-disable-line
            />
            <NotesEdit
              notes={this.props.notes}
              selected={this.props.selected}
              noteEdited={this.noteEdited}
              ref={c => this.edit = c} // eslint-disable-line
            />
          </SplitPane>
        </div>
      </div>
    );
  }
}

function validateSelected(selected, notes) {
  const noteIndex = notes.findIndex(note => note.get('title') === selected);
  return noteIndex !== -1 ? selected : null;
}

export function mapStateToProps(state) {
  const selected = validateSelected(state.get('selected'), state.get('notes'));
  return {
    query: state.get('query'),
    notes: state.get('notes'),
    selected,
    orderBy: state.get('orderBy'),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    searchNotes: bindActionCreators(actionCreators.searchNotes, dispatch),
    setState: bindActionCreators(actionCreators.setState, dispatch),
    setQuery: bindActionCreators(actionCreators.setQuery, dispatch),
    setNotes: bindActionCreators(actionCreators.setNotes, dispatch),
    search: bindActionCreators(actionCreators.search, dispatch),
    addNote: bindActionCreators(actionCreators.addNote, dispatch),
    selectNote: bindActionCreators(actionCreators.selectNote, dispatch),
    clearSelection: bindActionCreators(actionCreators.clearSelection, dispatch),
    editNote: bindActionCreators(actionCreators.editNote, dispatch),
    deleteNote: bindActionCreators(actionCreators.deleteNote, dispatch),
    orderByTitle: bindActionCreators(actionCreators.orderByTitle, dispatch),
    orderByModified: bindActionCreators(actionCreators.orderByModified, dispatch),
    orderByCreated: bindActionCreators(actionCreators.orderByCreated, dispatch),
    toggleAscendingDescending: bindActionCreators(actionCreators.toggleAscendingDescending, dispatch),
  };
}

export const NotesAppContainer = connect(mapStateToProps, mapDispatchToProps)(NotesApp);
