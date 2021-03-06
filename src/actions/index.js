import { fromJS } from 'immutable';
import axios from 'axios';
import urlencode from 'urlencode';
import * as types from '../types';

export const URL_BASE = 'http://localhost:3456';
export const SEARCH_URL = `${URL_BASE}/search?q=`;
export const ADD_URL = `${URL_BASE}/notes`;
export const DELETE_URL = `${URL_BASE}/note`;

export function restSearchNotes(query) {
  const encoded = urlencode(query);
  const url = `${SEARCH_URL}${encoded}`;
  return axios.get(url);
}

export function restAddUpdateNote(title, text, timestamp) {
  const url = ADD_URL;
  const note = {
    title,
    text,
    timestamp: {
      modified: timestamp,
      created: timestamp,
    },
  };
  return axios.put(url, note);
}

export function restDeleteNote(title) {
  const encoded = urlencode(title);
  const url = `${DELETE_URL}/${encoded}`;
  return axios.delete(url);
}

export function searchNotes(query) {
  return restSearchNotes(query);
}

export function addNoteToNotes(title, text, timestamp) {
  return restAddUpdateNote(title, text, timestamp);
}

export function updateNoteToNotes(title, text, timestamp) {
  return restAddUpdateNote(title, text, timestamp);
}

export function deleteNoteInNotes(title) {
  return restDeleteNote(title);
}

export function setState(state) {
  return {
    type: types.SET_STATE,
    state,
  };
}

export function setQuery(query) {
  return {
    type: types.SET_QUERY,
    query,
  };
}

export function setNotes(notes) {
  return {
    type: types.SET_NOTES,
    notes,
  };
}

export function search(query) {
  return dispatch =>
    searchNotes(query).then((response) => {
      const notes = response.data;
      const immutableNotes = fromJS(notes.notes);

      dispatch(setQuery(query));
      dispatch(setNotes(immutableNotes));
      if (immutableNotes.count() === 0 || query === '') {
        dispatch({
          type: types.SELECT_NOTE,
          title: null,
        });
      } else {
        const notesSorted = immutableNotes.sortBy(note => note.get('title'));
        dispatch({
          type: types.SELECT_NOTE,
          title: notesSorted.get(0).get('title'),
        });
      }
    });
}

export function addNote(title, text) {
  const timestamp = (new Date()).toISOString();
  return dispatch =>
    addNoteToNotes(title, text, timestamp).then(() => {
      dispatch({
        type: types.ADD_NOTE,
        title,
        text,
        timestamp,
      });
      dispatch({
        type: types.SELECT_NOTE,
        title,
      });
    });
}

export function selectNote(title) {
  return dispatch => {
    dispatch(setQuery(title));
    dispatch({
      type: types.SELECT_NOTE,
      title,
    });
  };
}

export function clearSelection() {
  return dispatch =>
    searchNotes('').then((response) => {
      const notes = response.data;
      const immutableNotes = fromJS(notes.notes);

      dispatch({
        type: types.SELECT_NOTE,
        title: null,
      });
      dispatch(setQuery(''));
      dispatch(setNotes(immutableNotes));
    });
}

export function editNote(selected, title, text) {
  const timestamp = (new Date()).toISOString();
  return dispatch => {
    const titleUpdate = { old: selected, new: title };
    return updateNoteToNotes(titleUpdate, text, timestamp).then(() => {
      dispatch({
        type: types.EDIT_NOTE,
        selected,
        title,
        text,
        timestamp,
      });
      dispatch({
        type: types.SELECT_NOTE,
        title,
      });
    });
  };
}

export function deleteNote(selected) {
  return dispatch =>
    deleteNoteInNotes(selected).then(() => {
      dispatch({
        type: types.DELETE_NOTE,
        selected,
      });
      dispatch({
        type: types.SELECT_NOTE,
        title: null,
      });
    });
}

export function orderByTitle() {
  return {
    type: types.ORDER_BY_TITLE,
  };
}

export function orderByModified() {
  return {
    type: types.ORDER_BY_MODIFIED,
  };
}

export function orderByCreated() {
  return {
    type: types.ORDER_BY_CREATED,
  };
}

export function toggleAscendingDescending() {
  return {
    type: types.TOGGLE_ASCENDING_DESCENDING,
  };
}
