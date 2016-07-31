import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesApp from '../../src/actions/index';
import {expect} from 'chai';
import {List, Map, Set, is} from 'immutable';
import _state from '../test_data';
import * as types from '../../src/types.js';
import * as actions from '../../src/actions/index';
import diff from 'immutablediff';
import * as tk from 'timekeeper';
import urlencode from 'urlencode';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

mockAxios = global.mockAxios;

describe('actions', () => {
  it('should create an action to set the complete state of the app', () => {
    const state = _state;
    const expectedAction = {
      type: types.SET_STATE,
      state
    };
    expect(actions.setState(state)).to.deep.equal(expectedAction);
  });

  it('should give action to set query and set notes to empty with difficult query', () => {
    mockAxios.reset();
    mockAxios.onGet(`${actions.SEARCH_URL}` + urlencode("test query")).reply(200, {
      notes: []
    });

    const query = 'test query';
    const notes = List.of();
    const expectedActions = [
      {
        type: types.SET_QUERY,
        query
      },
      {
        type: types.SET_NOTES,
        notes
      }
    ];

    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actions.search(query)).then(() => {
      const actionsGot = store.getActions();
      expect(actionsGot).to.deep.equal(expectedActions);
    });
  });

  it('should give action to set query and set notes to all with empty query', () => {
    mockAxios.reset();
    mockAxios.onGet(`${actions.SEARCH_URL}`).reply(200, {
      notes: _state.get("notes").toJS()
    });

    const query = '';
    const notes = _state.get("notes");
    const expectedActions = [
      {
        type: types.SET_QUERY,
        query
      },
      {
        type: types.SET_NOTES,
        notes
      }
    ];

    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actions.search(query)).then(() => {
      const actionsGot = store.getActions();
      expect(actionsGot).to.deep.equal(expectedActions);
    });
  });

  it('should create an action to add new note with given title and text', () => {
    const timestamp = (new Date()).toISOString();
    tk.freeze(timestamp);
    const title = 'test title';
    const text = 'test content for note text';
    const expectedAction = {
      type: types.ADD_NOTE,
      title,
      text,
      timestamp
    };
    expect(actions.addNote(title, text)).to.deep.equal(expectedAction);
    tk.reset();
  });

  it('should create an action to select note by title', () => {
    const title = 'react';
    const notes = List.of(_state.get("notes").get(0));
    const expectedActions = [
      {
        type: types.SET_QUERY,
        query: title
      },
      {
        type: types.SELECT_NOTE,
        title
      }
    ];

    const getState = _state;
    const store = mockStore(getState);
    store.dispatch(actions.selectNote(title));
    const actionsGot = store.getActions();
    expect(actionsGot).to.deep.equal(expectedActions);
  });

  it('clearSelection should give action to empty query and set notes to all and selected to null', () => {
    mockAxios.reset();
    mockAxios.onGet(`${actions.SEARCH_URL}`).reply(200, {
      notes: _state.get("notes").toJS()
    });

    const notes = List.of();
    const expectedActions = [
      {
        type: types.SELECT_NOTE,
        title: null
      },
      {
        type: types.SET_QUERY,
        query: ''
      },
      {
        type: types.SET_NOTES,
        notes: _state.get("notes")
      }
    ];

    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actions.clearSelection()).then(() => {
      const actionsGot = store.getActions();
      expect(actionsGot).to.deep.equal(expectedActions);
    });
  });

  it('should create an action to edit the note having title with given text', () => {
    const timestamp = (new Date()).toISOString();
    tk.freeze(timestamp);
    const selected = 'test title';
    const title = 'test title new';
    const text = 'test content for note text';
    const expectedAction = {
      type: types.EDIT_NOTE,
      selected,
      title,
      text,
      timestamp
    };
    expect(actions.editNote(selected, title, text)).to.deep.equal(expectedAction);
    tk.reset();
  });

  it('should create an action to delete note with given title', () => {
    const selected = 'test title';
    const expectedAction = {
      type: types.DELETE_NOTE,
      selected
    };
    expect(actions.deleteNote(selected)).to.deep.equal(expectedAction);
  });

  it('should create an action to set list order by to title', () => {
    const expectedAction = {
      type: types.ORDER_BY_TITLE
    };
    expect(actions.orderByTitle()).to.deep.equal(expectedAction);
  });

  it('should create an action to set list order by to modified', () => {
    const expectedAction = {
      type: types.ORDER_BY_MODIFIED
    };
    expect(actions.orderByModified()).to.deep.equal(expectedAction);
  });

  it('should create an action to set list order by to created', () => {
    const expectedAction = {
      type: types.ORDER_BY_CREATED
    };
    expect(actions.orderByCreated()).to.deep.equal(expectedAction);
  });

  it('should create an action to toggle list order between ascending / descending', () => {
    const expectedAction = {
      type: types.TOGGLE_ASCENDING_DESCENDING
    };
    expect(actions.toggleAcendingDescending()).to.deep.equal(expectedAction);
  });
});
