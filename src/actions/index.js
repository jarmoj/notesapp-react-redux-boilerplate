import * as types from '../types';
import {Map, fromJS} from 'immutable';
import axios from 'axios';
import urlencode from 'urlencode';

export const URL_BASE='http://localhost:3456';
export const SEARCH_URL=`${URL_BASE}/search?q=`;

export function restSearchNotes(query) {
  const encoded = urlencode(query);
  const url = `${SEARCH_URL}${encoded}`;
  return axios.get(url);
}

export function searchNotes(query) {
  return restSearchNotes(query);
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

export function setNotes(notes) {
  return {
    type: types.SET_NOTES,
    notes
  };
}

export function search(query) {
  return dispatch => {
    return searchNotes(query).then((response) => {
      const notes = response.data;
      const immutableNotes = fromJS(notes.notes);

      dispatch(setQuery(query));
      dispatch(setNotes(immutableNotes));
    });
  }
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
  return dispatch => {
    dispatch(setQuery(title));
    dispatch({
      type: types.SELECT_NOTE,
      title
    });
  }
}

export function clearSelection() {
  return dispatch => {
    return searchNotes('').then((response) => {
      const notes = response.data;
      const immutableNotes = fromJS(notes.notes);

      dispatch({
        type: types.SELECT_NOTE,
        title: null
      });
      dispatch(setQuery(''));
      dispatch(setNotes(immutableNotes));
    });
  }
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
