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
  it('renders a list item with its title contents, text body, and date modified/created depending orderBy', () => {
    const title = "some title title";
    const text = "something for the text body";
    const timestamp = Map({
      created: 'EEST 1970-10-12 11:33',
      modified: 'EEST 1980-10-12 12:33'
    });

    const componentModified = renderIntoDocument(
      <NotesListItem title={title} text={text} timestamp={timestamp} orderBy="modified" />
    );

    expect(componentModified._row.textContent).to.contain(title);
    expect(componentModified._row.textContent).to.contain(text);
    expect(componentModified._row.textContent).to.contain(timestamp.get('modified'));

    const componentCreated = renderIntoDocument(
      <NotesListItem title={title} text={text} timestamp={timestamp} orderBy="created" />
    );

    expect(componentCreated._row.textContent).to.contain(title);
    expect(componentCreated._row.textContent).to.contain(text);
    expect(componentCreated._row.textContent).to.contain(timestamp.get('created'));
  });
  it('check that a list item that is selected by select prop gets selected class', () => {
    const componentNotSelected = renderIntoDocument(
      <NotesListItem selected={false} />
    );

    expect(componentNotSelected._row.classList.contains('selected')).to.equal(false);

    const componentSelected = renderIntoDocument(
      <NotesListItem selected={true} />
    );
    expect(componentSelected._row.classList.contains('selected')).to.equal(true);

  });
  it('has a pretty date format for the timestamp', () => {
    expect(false).to.equal(true);
  });
  it('timestamps are compared properly', () => {
    expect(false).to.equal(true);
  });
});
