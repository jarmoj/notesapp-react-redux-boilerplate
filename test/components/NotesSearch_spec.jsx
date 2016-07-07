import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesSearch from '../../src/components/NotesSearch';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('NotesSearch', () => {
  it('returns the query string in notesSearch when edited', () => {
    expect(false).to.equal(true);
  });
});
