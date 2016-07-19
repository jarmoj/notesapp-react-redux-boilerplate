import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesApp from '../../src/actions/index';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import _state from '../test_data';
import * as types from '../../src/types.js';
import * as actions from '../../src/actions/index';
import diff from 'immutablediff';
import * as tk from 'timekeeper';

describe('actions', () => {
  it('should create an action to set the complete state of the app', () => {
    const state = _state;
    const expectedAction = {
      type: types.SET_STATE,
      state
    };
    expect(actions.setState(state)).to.deep.equal(expectedAction);
  });

  it('should create an action to set the search query', () => {
    const query = 'test query';
    const expectedAction = {
      type: types.SET_QUERY,
      query
    };
    expect(actions.setQuery(query)).to.deep.equal(expectedAction);
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
    const title = 'test title';
    const expectedAction = {
      type: types.SELECT_NOTE,
      title
    };
    expect(actions.selectNote(title)).to.deep.equal(expectedAction);
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

  it('should create an action to toggle list order between modified and created', () => {
    const expectedAction = {
      type: types.TOGGLE_ORDER_BY
    };
    expect(actions.toggleOrderBy()).to.deep.equal(expectedAction);
  });
});
