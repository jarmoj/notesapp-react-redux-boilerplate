import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesApp from '../../src/actions/index';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import notes from '../test_data';

describe('actions', () => {
  it('should create an action to edit a search query', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.ADD_NOTE,
      text
    }
    expect(actions.addNote(text)).toEqual(expectedAction)
  });
});
