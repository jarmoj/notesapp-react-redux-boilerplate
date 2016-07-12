import React from 'react';
import TestUtils from 'react-addons-test-utils';
import NotesList from '../../src/components/NotesList';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import _state from '../test_data';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('NotesList', () => {
  it('by default renders a list with notes in modified order', () => {
    const notes = _state.get('notes');
    const component = renderIntoDocument(
      <NotesList notes={notes} />
    );
    expect(component._items[0].props.title).to.equal('react');
    expect(component._items[1].props.title).to.equal('redux');
    expect(component._items[2].props.title).to.equal('immutable');
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
