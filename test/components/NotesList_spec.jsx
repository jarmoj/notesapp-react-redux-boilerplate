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
  it('by default renders a list with notes in modified descending order', () => {
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
    let wasCalled = false
    let titleHeaderClicked = function () {
      wasCalled = true;
    }
    const component = renderIntoDocument(
      <NotesList notes={List.of()} titleHeaderClicked={titleHeaderClicked}/>
    );
    Simulate.click(component._titleHeader);

    expect(wasCalled).to.equal(true);
  });
  it('orderByTitle returns list of notes ordered by title ascending', () => {
    const notes = _state.get('notes');

    const component = renderIntoDocument(
      <NotesList notes={notes}/>
    );

    const notesTitleAscending = component.orderByTitle(notes);
    expect(notesTitleAscending.get(0).get('title')).to.equal('immutable');
    expect(notesTitleAscending.get(1).get('title')).to.equal('react');
    expect(notesTitleAscending.get(2).get('title')).to.equal('redux');
  });
  it('orderByModified returns list of notes ordered by modified ascending', () => {
    const notes = _state.get('notes');

    const component = renderIntoDocument(
      <NotesList notes={notes}/>
    );

    const notesModifiedAscending = component.orderByModified(notes);
    expect(notesModifiedAscending.get(0).get('title')).to.equal('immutable');
    expect(notesModifiedAscending.get(1).get('title')).to.equal('redux');
    expect(notesModifiedAscending.get(2).get('title')).to.equal('react');
  });
  it('list lists items according to orderBy = title ascending | descending', () => {
    const notes = _state.get('notes');

    const componentTitleAscending = renderIntoDocument(
      <NotesList notes={notes} orderBy="title ascending"/>
    );

    expect(componentTitleAscending._items[0].props.title).to.equal('immutable');
    expect(componentTitleAscending._items[1].props.title).to.equal('react');
    expect(componentTitleAscending._items[2].props.title).to.equal('redux');

    const componentTitleDescending = renderIntoDocument(
      <NotesList notes={notes} orderBy="title descending"/>
    );

    expect(componentTitleDescending._items[0].props.title).to.equal('redux');
    expect(componentTitleDescending._items[1].props.title).to.equal('react');
    expect(componentTitleDescending._items[2].props.title).to.equal('immutable');
  });
  it('clicking Modified / Created header will call timestampHeaderClicked handler', () => {
    let wasCalled = false
    let timestampHeaderClicked = function () {
      wasCalled = true;
    }
    const component = renderIntoDocument(
      <NotesList notes={List.of()} timestampHeaderClicked={timestampHeaderClicked}/>
    );
    Simulate.click(component._timestampHeader);

    expect(wasCalled).to.equal(true);
  });
  it('list list items according to orderBy = (modified | created) (ascending | descending)', () => {
    const notes = _state.get('notes');

    const componentModifiedAscending = renderIntoDocument(
      <NotesList notes={notes} orderBy="modified ascending"/>
    );

    expect(componentModifiedAscending._items[0].props.title).to.equal('immutable');
    expect(componentModifiedAscending._items[1].props.title).to.equal('redux');
    expect(componentModifiedAscending._items[2].props.title).to.equal('react');

    const componentModifiedDescending = renderIntoDocument(
      <NotesList notes={notes} orderBy="modified descending"/>
    );

    expect(componentModifiedDescending._items[0].props.title).to.equal('react');
    expect(componentModifiedDescending._items[1].props.title).to.equal('redux');
    expect(componentModifiedDescending._items[2].props.title).to.equal('immutable');

    const componentCreatedAscending = renderIntoDocument(
      <NotesList notes={notes} orderBy="created ascending"/>
    );

    expect(componentCreatedAscending._items[0].props.title).to.equal('react');
    expect(componentCreatedAscending._items[1].props.title).to.equal('redux');
    expect(componentCreatedAscending._items[2].props.title).to.equal('immutable');

    const componentCreatedDescending = renderIntoDocument(
      <NotesList notes={notes} orderBy="created descending"/>
    );

    expect(componentCreatedDescending._items[0].props.title).to.equal('immutable');
    expect(componentCreatedDescending._items[1].props.title).to.equal('redux');
    expect(componentCreatedDescending._items[2].props.title).to.equal('react');
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
