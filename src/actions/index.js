import * as types from '../../src/types.js';
import {Map} from 'immutable';

export function searchNotes(query) {
  // branch between socket.io vs REST API  
}

export function setState(state) {
  return {
    type: types.SET_STATE,
    state
  };
}

export function setQuery(query) {
  return {
    type: types.SET_QUERY,
    query
  };
}

export function search(query) {
  return searchNotes(query).then(
    () => dispatch(setQuery(query)),
    notes => dispatch(setNotes(notes))
  );
}

export function addNote(title, text) {
  const timestamp = (new Date()).toISOString();
  return {
    type: types.ADD_NOTE,
    title,
    text,
    timestamp
  };
}

export function selectNote(title) {
  return {
    type: types.SELECT_NOTE,
    title
  };
}

export function editNote(selected, title, text) {
  const timestamp = (new Date()).toISOString();
  return {
    type: types.EDIT_NOTE,
    selected,
    title,
    text,
    timestamp
  };
}

export function deleteNote(selected) {
  return {
    type: types.DELETE_NOTE,
    selected
  };
}

export function toggleOrderBy() {
  return {
    type: types.TOGGLE_ORDER_BY
  };
}
