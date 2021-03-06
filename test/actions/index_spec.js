import TestUtils from 'react-addons-test-utils';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { List, Set, is } from 'immutable';
import diff from 'immutablediff';
import * as tk from 'timekeeper';
import urlencode from 'urlencode';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _state from '../test_data';
import * as types from '../../src/types.js';
import * as actions from '../../src/actions/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions', () => {
  it('should create an action to set the complete state of the app', () => {
    const state = _state;
    const expectedAction = {
      type: types.SET_STATE,
      state,
    };
    expect(actions.setState(state)).to.deep.equal(expectedAction);
  });

  it('should give action to set query and set notes to empty with difficult query', () => {
    global.mockAxios.reset();
    const encoded = urlencode('test query');
    global.mockAxios.onGet(`${actions.SEARCH_URL}${encoded}`).reply(200, {
      notes: [],
    });

    const query = 'test query';
    const notes = List.of();
    const expectedActions = [
      {
        type: types.SET_QUERY,
        query,
      },
      {
        type: types.SET_NOTES,
        notes,
      },
      {
        type: types.SELECT_NOTE,
        title: null,
      },
    ];

    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actions.search(query)).then(() => {
      const actionsGot = store.getActions();
      expect(actionsGot).to.deep.equal(expectedActions);
    });
  });

  it('should give action to set query and set notes to all with empty query', () => {
    global.mockAxios.reset();
    global.mockAxios.onGet(`${actions.SEARCH_URL}`).reply(200, {
      notes: _state.get('notes').toJS(),
    });

    const query = '';
    const notes = _state.get('notes');
    const expectedActions = [
      {
        type: types.SET_QUERY,
        query,
      },
      {
        type: types.SET_NOTES,
        notes,
      },
      {
        type: types.SELECT_NOTE,
        title: null,
      },
    ];

    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actions.search(query)).then(() => {
      const actionsGot = store.getActions();
      expect(actionsGot).to.deep.equal(expectedActions);
    });
  });

  it('should create an action to add new note with given title and text', () => {
    global.mockAxios.reset();
    global.mockAxios.onPut('http://localhost:3456/notes').reply(200);

    const timestamp = (new Date()).toISOString();
    tk.freeze(timestamp);
    const title = 'test title';
    const text = 'test content for note text';
    const expectedActions = [
      {
        type: types.ADD_NOTE,
        title,
        text,
        timestamp,
      },
      {
        type: types.SELECT_NOTE,
        title,
      },
    ];

    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actions.addNote(title, text)).then(() => {
      const actionsGot = store.getActions();
      tk.reset();
      expect(actionsGot).to.deep.equal(expectedActions);
    });
  });

  it('should create an action to select note by title', () => {
    const title = 'react';
    const notes = List.of(_state.get('notes').get(0));
    const expectedActions = [
      {
        type: types.SET_QUERY,
        query: title,
      },
      {
        type: types.SELECT_NOTE,
        title,
      },
    ];

    const getState = _state;
    const store = mockStore(getState);
    store.dispatch(actions.selectNote(title));
    const actionsGot = store.getActions();
    expect(actionsGot).to.deep.equal(expectedActions);
  });

  it('clearSelection should empty query, set notes to all and selected to null', () => {
    global.mockAxios.reset();
    global.mockAxios.onGet(`${actions.SEARCH_URL}`).reply(200, {
      notes: _state.get('notes').toJS(),
    });

    const expectedActions = [
      {
        type: types.SELECT_NOTE,
        title: null,
      },
      {
        type: types.SET_QUERY,
        query: '',
      },
      {
        type: types.SET_NOTES,
        notes: _state.get('notes'),
      },
    ];

    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actions.clearSelection()).then(() => {
      const actionsGot = store.getActions();
      expect(actionsGot).to.deep.equal(expectedActions);
    });
  });

  it('should create an action to edit the note having title with given text', () => {
    const url = `${actions.ADD_URL}`;
    global.mockAxios.reset();
    global.mockAxios.onPut(url).reply(200);

    const timestamp = (new Date()).toISOString();
    tk.freeze(timestamp);
    const selected = 'test title';
    const title = 'test title new';
    const text = 'test content for note text';
    const expectedActions = [
      {
        type: types.EDIT_NOTE,
        selected,
        title,
        text,
        timestamp,
      },
      {
        type: types.SELECT_NOTE,
        title,
      },
    ];

    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actions.editNote(selected, title, text)).then(() => {
      const actionsGot = store.getActions();
      tk.reset();
      expect(actionsGot).to.deep.equal(expectedActions);
    });
  });

  it('should create an action to delete note with given title', () => {
    const selected = 'test title';
    const encoded = urlencode(selected);
    const url = `${actions.DELETE_URL}/${encoded}`;
    global.mockAxios.reset();
    global.mockAxios.onDelete(url).reply(200);

    const expectedActions = [
      {
        type: types.DELETE_NOTE,
        selected,
      },
      {
        type: types.SELECT_NOTE,
        title: null,
      },
    ];

    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actions.deleteNote(selected)).then(() => {
      const actionsGot = store.getActions();
      expect(actionsGot).to.deep.equal(expectedActions);
    });
  });

  it('should create an action to set list order by to title', () => {
    const expectedAction = {
      type: types.ORDER_BY_TITLE,
    };
    expect(actions.orderByTitle()).to.deep.equal(expectedAction);
  });

  it('should create an action to set list order by to modified', () => {
    const expectedAction = {
      type: types.ORDER_BY_MODIFIED,
    };
    expect(actions.orderByModified()).to.deep.equal(expectedAction);
  });

  it('should create an action to set list order by to created', () => {
    const expectedAction = {
      type: types.ORDER_BY_CREATED,
    };
    expect(actions.orderByCreated()).to.deep.equal(expectedAction);
  });

  it('should create an action to toggle list order between ascending / descending', () => {
    const expectedAction = {
      type: types.TOGGLE_ASCENDING_DESCENDING,
    };
    expect(actions.toggleAscendingDescending()).to.deep.equal(expectedAction);
  });
});
