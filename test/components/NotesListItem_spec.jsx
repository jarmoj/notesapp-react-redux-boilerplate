import React from 'react';
import TestUtils from 'react-addons-test-utils';
import NotesListItem from '../../src/components/NotesListItem';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import notes from '../test_data';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('NotesListItem - Selection', () => {
  it('clicking row calls rowClicked() handler', () => {
    let wasCalled = "";
    const title = "some title title";
    let rowClicked = function (title) {
      wasCalled = title;
    }
    const component = renderIntoDocument(
      <NotesListItem title={title} rowClicked={rowClicked} />
    );
    Simulate.click(component._row);

    expect(wasCalled).to.equal(title);
  });
});

describe('NotesListItem - Visual', () => {
  it('Every even row gets even-row and odd one odd-row class', () => {
    const componentEven = renderIntoDocument(
      <NotesListItem isOddRow={false} />
    );
    expect(componentEven._row.classList.contains('even-row')).to.equal(true);
    expect(componentEven._row.classList.contains('odd-row')).to.equal(false);

    const componentOdd = renderIntoDocument(
      <NotesListItem isOddRow={true} />
    );

    expect(componentOdd._row.classList.contains('even-row')).to.equal(false);
    expect(componentOdd._row.classList.contains('odd-row')).to.equal(true);
  });
  it('renders a list item with its title contents, beginning of text body, and date modified/created depending orderBy', () => {
    expect(false).to.equal(true);
  });
  it('check that a list item that is selected by select prop gets selected class', () => {
    expect(false).to.equal(true);
  });
});
