import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesEdit from '../../src/components/NotesEdit';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import notes from '../test_data';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('NotesEdit', () => {
  it('changing the edit will call the onEditText', () => {
    expect(false).to.equal(true);
  });
});
