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
  it('clicking Title header will sort the list alphabetically ascending /descending order', () => {
    expect(false).to.equal(true);
  });
  it('clicking Modified / Created header will change order by timestamp and ascending / descending', () => {
    expect(false).to.equal(true);
  });
  it('clicking Modified / Created header will change header text and arrow respectively', () => {
    expect(false).to.equal(true);
  });
  it('clicking down arrow will order the items in ascending / descending', () => {
    expect(false).to.equal(true);
  });
  it('clicking down arrow will turn it uparrow and another click back', () => {
    expect(false).to.equal(true);
  });
});
