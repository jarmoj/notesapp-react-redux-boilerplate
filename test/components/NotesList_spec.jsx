import React from 'react';
import TestUtils from 'react-addons-test-utils';
import NotesList from '../../src/components/NotesList';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import notes from '../test_data';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('NotesList', () => {
  it('renders a list with notes in default (modified) order', () => {
    expect(false).to.equal(true);
  });
  it('clicking note in list will call noteClicked handler', () => {
    expect(false).to.equal(true);
  });
});
