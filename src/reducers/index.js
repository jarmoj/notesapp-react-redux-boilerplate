import * as types from '../../src/types.js';
import {Map, List} from 'immutable';

function findItemIndex(state, title) {
  return state.get('notes').findIndex(note => note.get('title') == title);
}

function setState(state, newState) {
  return state.merge(newState);
}

function setQuery(state, query) {
  return state.set('query', query);
}

function addNote(state, title, text) {
  const now = (new Date()).toISOString();
  const newNote = Map({
    title: title,
    text: text,
    timestamp: Map({
      created: now,
      modified: now
    })
  });
  return state.update('notes', notes => notes.push(newNote));
}

function selectNote(state, title) {
  return state.set('selected', title);
}

function editNote(state, selected, title, text) {
  const index = findItemIndex(state, selected);
  const now = (new Date()).toISOString();
  const updatedNote = state.get('notes')
    .get(index)
    .set('title', title)
    .set('text', text)
    .setIn(['timestamp', 'modified'], now);
  return state.update('notes', notes => notes.set(index, updatedNote));
}

function deleteNote(state, selected) {
  const index = findItemIndex(state, selected);
  return state.update('notes', notes => notes.delete(index));
}

function toggleOrderBy(state) {
  const was = state.get('orderBy');
  if (state.get('orderBy').indexOf('modified') != -1) {
    return state.set('orderBy', was.replace('modified', 'created'));
  }
  return state.set('orderBy', was.replace('created', 'modified'));
}

export default function(state = Map(), action) {
  switch (action.type) {
    case types.SET_STATE:
      return setState(state, action.state);
    case types.SET_QUERY:
      return setQuery(state, action.query);
    case types.ADD_NOTE:
      return addNote(state, action.title, action.text);
    case types.SELECT_NOTE:
      return selectNote(state, action.title);
    case types.EDIT_NOTE:
      return editNote(state, action.selected, action.title, action.text);
    case types.DELETE_NOTE:
      return deleteNote(state, action.selected);
    case types.TOGGLE_ORDER_BY:
      return toggleOrderBy(state);
  }
  return state;
}
