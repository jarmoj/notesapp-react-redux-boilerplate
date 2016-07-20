import * as types from '../types';
import {Map} from 'immutable';
import axios from 'axios';
import urlencode from 'urlencode';

const URL=`http://localhost:3456/search/$(QUERY)`;

export function restSearchNotes(query) {
  console.log("restSearchNotes()");
  const encoded = urlencode(query);
  const url = `$(URL)&$(encoded)`;
  //return axios.get(url);
  return {
    then: (dispatch) => {
      console.log("then");
      dispatch({
        data: []
      })
    }
  };
}

export function searchNotes(query) {
  console.log("searchNotes()");
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
  console.log("search('" + query + "')");
  return (dispatch) => {
    console.log("search().dispatch");
    return searchNotes(query).then((response) => {
      console.log("search().dispatch.then");
      //const notes = response.data;
      const notes = [];
      return [
        dispatch(setQuery(query)),
        dispatch(setNotes(notes))
      ];
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
