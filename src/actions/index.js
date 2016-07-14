import * as types from '../../src/types.js';
import {Map} from 'immutable';

export function setState(state) {
  return Map({
    type: types.SET_STATE,
    state
  });
}

export function setQuery(query) {
  return Map({
    type: types.SET_QUERY,
    query
  });
}

export function addNote(title, text) {
  const timestamp = (new Date()).toISOString();
  return Map({
    type: types.ADD_NOTE,
    title,
    text,
    timestamp
  });
}

export function selectNote(title) {
  return Map({
    type: types.SELECT_NOTE,
    title
  });
}

export function editNote(selected, title, text) {
  const timestamp = (new Date()).toISOString();
  return Map({
    type: types.EDIT_NOTE,
    selected,
    title,
    text,
    timestamp
  });
}

export function deleteNote(selected) {
  return Map({
    type: types.DELETE_NOTE,
    selected
  });
}

export function toggleOrderBy() {
  return Map({
    type: types.TOGGLE_ORDER_BY
  });
}
