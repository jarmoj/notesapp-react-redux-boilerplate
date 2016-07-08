import React from 'react';
import TestUtils from 'react-addons-test-utils';
import NotesListItem from '../../src/components/NotesListItem';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import notes from '../test_data';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag} = TestUtils;

describe('NotesListItem - Selection', () => {
  it('clicking row calls rowClicked() handler', () => {
    expect(false).to.equal(true);
  });
});

describe('NotesListItem - Visual', () => {
  it('Every even row gets even-row and odd one odd-row class', () => {
    expect(false).to.equal(true);
  });
  it('renders a list item with its title contents, beginning of text body, and date modified/created depending orderBy', () => {
    expect(false).to.equal(true);
  });
  it('check that a list item that is selected by select prop gets selected class', () => {
    expect(false).to.equal(true);
  });
});
