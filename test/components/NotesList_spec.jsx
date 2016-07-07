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
  let wasCalled;
  let onSelect;
  let component;
  let rows;
  let items;
  beforeEach(() => {
    wasCalled = false;
    onSelect = function (id) {
      wasCalled = true;
    };
    component = renderIntoDocument(
      <NotesList notes={notes} onSelect={onSelect}/>
    );
    rows = scryRenderedDOMComponentsWithTag(component, 'tr');
    items = scryRenderedDOMComponentsWithTag(component, 'td');
  });
  it('renders a list with notes in default (modified) order', () => {
    expect(items.length).to.equal(9);
    expect(items[0].textContent).to.contain('react');
    expect(items[3].textContent).to.contain('redux');
    expect(items[6].textContent).to.contain('immutable');
  });
  it('clicking note in list will call noteClicked handler', () => {
    Simulate.click(rows[0]);
    expect(wasCalled);
  });
});
