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

describe('actions', () => {
  it('should create an action to set the complete state of the app', () => {
    const state = _state;
    const expectedAction = Map({
      type: types.SET_STATE,
      state
    });
    expect(actions.setState(state)).to.equal(expectedAction);
  });

  it('should create an action to set the search query', () => {
    const query = 'test query';
    const expectedAction = Map({
      type: types.SET_QUERY,
      query
    });
    expect(actions.setQuery(query)).to.equal(expectedAction);
  });

  it('should create an action to add new note with given title and text', () => {
    const title = 'test title';
    const text = 'test content for note text';
    const expectedAction = Map({
      type: types.ADD_NOTE,
      title,
      text
    });
    expect(actions.addNote(title, text)).to.equal(expectedAction);
  });

  it('should create an action to select note by title', () => {
    const title = 'test title';
    const expectedAction = Map({
      type: types.SELECT_NOTE,
      title
    });
    expect(actions.selectNote(title)).to.equal(expectedAction);
  });

  it('should create an action to edit the note having title with given text', () => {
    const selected = 'test title';
    const title = 'test title new';
    const text = 'test content for note text';
    const expectedAction = Map({
      type: types.EDIT_NOTE,
      selected,
      title,
      text
    });
    expect(actions.editNote(selected, title, text)).to.equal(expectedAction);
  });

  it('should create an action to delete note with given title', () => {
    const selected = 'test title';
    const expectedAction = Map({
      type: types.DELETE_NOTE,
      selected
    });
    expect(actions.deleteNote(selected)).to.equal(expectedAction);
  });

  it('should create an action to toggle list order between modified and created', () => {
    const expectedAction = Map({
      type: types.TOGGLE_ORDER_BY
    });
    expect(actions.toggleOrderBy()).to.equal(expectedAction);
  });
});
