import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesApp from '../../src/actions/index';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import _state from '../test_data';
import * as types from '../../src/types.js';

describe('actions', () => {
  it('should create an action to set the complete state of the app', () => {
    const state = _state;
    const expectedAction = {
      type: types.SET_QUERY,
      state
    };
    expect(actions.setState(state)).toEqual(expectedAction);
  });

  it('should create an action to set the search query', () => {
    const query = 'test query';
    const expectedAction = {
      type: types.SET_QUERY,
      query
    };
    expect(actions.setQuery(text)).toEqual(expectedAction);
  });

  it('should create an action to add new note with given title and text', () => {
    const title = 'test title';
    const text = 'test content for note text';
    const expectedAction = {
      type: types.ADD_NOTE,
      title,
      text
    };
    expect(actions.addNote(title, text)).toEqual(expectedAction);
  });

  it('should create an action to select note by title', () => {
    const title = 'test title';
    const expectedAction = {
      type: types.SELECT_NOTE,
      title
    };
    expect(actions.selectNote(title)).toEqual(expectedAction);
  });

  it('should create an action to edit the note having title with given text', () => {
    const title = 'test title';
    const text = 'test content for note text';
    const expectedAction = {
      type: types.ADD_NOTE,
      title,
      text
    };
    expect(actions.editNode(title, text)).toEqual(expectedAction);
  });

  it('should create an action to delete note with given title', () => {
    const title = 'test title';
    const expectedAction = {
      type: types.DELETE_NOTE,
      title
    };
    expect(actions.deleteNote(title)).toEqual(expectedAction);
  });

  it('should create an action to toggle list order between modified and created', () => {
    const expectedAction = {
      type: types.TOGGLE_ORDER_BY
    };
    expect(actions.toggleOrderBy(text)).toEqual(expectedAction);
  });
});
