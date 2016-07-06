import React from 'react';
import TestUtils from 'react-addons-test-utils';
import NotesList from '../../src/components/NotesList';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag} = TestUtils;

const notes = List.of(
  Map({
    id: 'a1', title: 'react', text: 'Stuff about React.',
    timestamp: Map({
      created: 'EEST 1970-10-12 11:33',
      modified: 'EEST 1980-10-12 12:33'
    })
  }),
  Map({
    id: '2e', title: 'redux', text: 'Stuff about Redux.',
    timestamp: Map({
      created: 'EEST 1970-10-12 11:34',
      modified: 'EEST 1980-10-12 12:32'
    })
  }),
  Map({
    id: '3r', title: 'immutable', text: 'Stuff about Immutable.',
    timestamp: Map({
      created: 'EEST 1970-10-12 11:35',
      modified: 'EEST 1980-10-12 12:31'
    })
  })
);

describe('NotesList', () => {
  it('renders a list with notes in default (modified) order', () => {
    const component = renderIntoDocument(
      <NotesList notes={notes} />
    );
    const items = scryRenderedDOMComponentsWithTag(component, 'td');
    expect(items.length).to.equal(9);
    expect(items[0].textContent).to.contain('react');
    expect(items[3].textContent).to.contain('redux');
    expect(items[6].textContent).to.contain('immutable');
  });
});
