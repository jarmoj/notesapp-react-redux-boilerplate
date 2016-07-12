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
    let wasCalled = "";
    const notes = _state.get('notes');
    let noteClicked = function (title) {
      wasCalled = title;
    }
    const component = renderIntoDocument(
      <NotesList notes={notes} noteClicked={noteClicked}/>
    );
    Simulate.click(component._items[1]._row);

    expect(wasCalled).to.equal('redux');
  });
  it('clicking Title header will call titleHeaderClicked handler', () => {
    expect(false).to.equal(true);
  });
  it('list lists items according to orderBy = title ascending | descending', () => {
    expect(false).to.equal(true);
  });
  it('clicking Modified / Created header will call timestampHeaderClicked handler', () => {
    expect(false).to.equal(true);
  });
  it('list lists items according to orderBy = (modified | created) (ascending | descending)', () => {
    expect(false).to.equal(true);
  });
  it('orderby modify | created is printed in the timestamp header text', () => {
    expect(false).to.equal(true);
  });
  it('orderby ascending | descending is reflected in the header arrow', () => {
    expect(false).to.equal(true);
  });
  it('clicking header arrow will call arrowHeaderClicked handler', () => {
    expect(false).to.equal(true);
  });
});
