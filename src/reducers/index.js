import { Map } from 'immutable';
import * as types from '../../src/types.js';

function findItemIndex(state, title) {
  return state.get('notes').findIndex(note => note.get('title') === title);
}

function setState(state, newState) {
  return state.merge(newState);
}

function setQuery(state, query) {
  return state.set('query', query);
}

function setNotes(state, notes) {
  return state.set('notes', notes);
}

function addNote(state, title, text, timestamp) {
  const newNote = new Map({
    title,
    text,
    timestamp: new Map({
      created: timestamp,
      modified: timestamp,
    }),
  });
  return state.update('notes', notes => notes.push(newNote));
}

function selectNote(state, title) {
  return state.set('selected', title);
}

function editNote(state, selected, title, text, timestamp) {
  const index = findItemIndex(state, selected);
  const updatedNote = state.get('notes')
    .get(index)
    .set('title', title)
    .set('text', text)
    .setIn(['timestamp', 'modified'], timestamp);
  return state.update('notes', notes => notes.set(index, updatedNote));
}

function deleteNote(state, selected) {
  const index = findItemIndex(state, selected);
  return state.update('notes', notes => notes.delete(index));
}

function orderByX(state, x) {
  const parts = state.get('orderBy').split(' ');
  if (parts[1] === 'ascending') {
    return state.set('orderBy', `${x} ascending`);
  }
  return state.set('orderBy', `${x} descending`);
}

function orderByTitle(state) {
  return orderByX(state, 'title');
}

function orderByModified(state) {
  return orderByX(state, 'modified');
}

function orderByCreated(state) {
  return orderByX(state, 'created');
}

function toggleAcendingDescending(state) {
  const parts = state.get('orderBy').split(' ');
  if (parts[1] === 'ascending') {
    return state.set('orderBy', `${parts[0]} descending`);
  }
  return state.set('orderBy', `${parts[0]} ascending`);
}

export default function (state = new Map(), action) {
  switch (action.type) {
    case types.SET_STATE:
      return setState(state, action.state);
    case types.SET_QUERY:
      return setQuery(state, action.query);
    case types.SET_NOTES:
      return setNotes(state, action.notes);
    case types.ADD_NOTE:
      return addNote(state, action.title, action.text, action.timestamp);
    case types.SELECT_NOTE:
      return selectNote(state, action.title);
    case types.EDIT_NOTE:
      return editNote(state, action.selected, action.title, action.text, action.timestamp);
    case types.DELETE_NOTE:
      return deleteNote(state, action.selected);
    case types.ORDER_BY_TITLE:
      return orderByTitle(state);
    case types.ORDER_BY_MODIFIED:
      return orderByModified(state);
    case types.ORDER_BY_CREATED:
      return orderByCreated(state);
    case types.TOGGLE_ASCENDING_DESCENDING:
      return toggleAcendingDescending(state);
    default:
      break;
  }
  return state;
}
