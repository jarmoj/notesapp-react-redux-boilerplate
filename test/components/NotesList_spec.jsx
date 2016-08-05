import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { List } from 'immutable';
import { shallow } from 'enzyme';
import { NotesList, UP_POINTING, DOWN_POINTING } from '../../src/components/NotesList';
import _state from '../test_data';

const { renderIntoDocument,
        Simulate } = TestUtils;

describe('NotesList', () => {
  it('by default renders a list with notes in modified descending order', () => {
    const notes = _state.get('notes');
    const component = renderIntoDocument(
      <NotesList
        notes={notes}
        selected=""
        orderBy=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );
    expect(component.items[0].props.title).to.equal('react');
    expect(component.items[1].props.title).to.equal('redux');
    expect(component.items[2].props.title).to.equal('immutable');
  });
  it('clicking note in list will call selectNote handler', () => {
    let wasCalled = '';
    const notes = _state.get('notes');
    function selectNote(title) {
      wasCalled = title;
    }
    const component = renderIntoDocument(
      <NotesList
        notes={notes}
        selectNote={selectNote}
        selected=""
        orderBy=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        deleteNote={() => null}
      />
    );
    Simulate.click(component.items[1].row);

    expect(wasCalled).to.equal('redux');
  });
  it('clicking Title header will call titleHeaderClicked handler', () => {
    let wasCalled = false;
    function titleHeaderClicked() {
      wasCalled = true;
    }
    const component = renderIntoDocument(
      <NotesList
        notes={List.of()}
        titleHeaderClicked={titleHeaderClicked}
        selected=""
        orderBy=""
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );
    Simulate.click(component.titleHeader);

    expect(wasCalled).to.equal(true);
  });
  it('orderByTitle returns list of notes ordered by title ascending', () => {
    const notes = _state.get('notes');

    const component = renderIntoDocument(
      <NotesList
        notes={notes}
        selected=""
        orderBy=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    const notesTitleAscending = component.orderByTitle(notes);
    expect(notesTitleAscending.get(0).get('title')).to.equal('immutable');
    expect(notesTitleAscending.get(1).get('title')).to.equal('react');
    expect(notesTitleAscending.get(2).get('title')).to.equal('redux');
  });
  it('orderByModified returns list of notes ordered by modified ascending', () => {
    const notes = _state.get('notes');

    const component = renderIntoDocument(
      <NotesList
        notes={notes}
        selected=""
        orderBy=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    const notesModifiedAscending = component.orderByModified(notes);
    expect(notesModifiedAscending.get(0).get('title')).to.equal('immutable');
    expect(notesModifiedAscending.get(1).get('title')).to.equal('redux');
    expect(notesModifiedAscending.get(2).get('title')).to.equal('react');
  });
  it('list lists items according to orderBy = title ascending | descending', () => {
    const notes = _state.get('notes');

    const componentTitleAscending = renderIntoDocument(
      <NotesList
        notes={notes}
        orderBy="title ascending"
        selected=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    expect(componentTitleAscending.items[0].props.title).to.equal('immutable');
    expect(componentTitleAscending.items[1].props.title).to.equal('react');
    expect(componentTitleAscending.items[2].props.title).to.equal('redux');

    const componentTitleDescending = renderIntoDocument(
      <NotesList
        notes={notes}
        orderBy="title descending"
        selected=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    expect(componentTitleDescending.items[0].props.title).to.equal('redux');
    expect(componentTitleDescending.items[1].props.title).to.equal('react');
    expect(componentTitleDescending.items[2].props.title).to.equal('immutable');
  });
  it('clicking Modified / Created header will call timestampHeaderClicked handler', () => {
    let wasCalled = false;
    function timestampHeaderClicked() {
      wasCalled = true;
    }
    const component = renderIntoDocument(
      <NotesList
        notes={List.of()}
        timestampHeaderClicked={timestampHeaderClicked}
        selected=""
        orderBy=""
        titleHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );
    Simulate.click(component.timestampHeader);

    expect(wasCalled).to.equal(true);
  });
  it('list list items according to orderBy = (modified | created) (ascending | descending)', () => {
    const notes = _state.get('notes');

    const componentModifiedAscending = renderIntoDocument(
      <NotesList
        notes={notes}
        orderBy="modified ascending"
        selected=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    expect(componentModifiedAscending.items[0].props.title).to.equal('immutable');
    expect(componentModifiedAscending.items[1].props.title).to.equal('redux');
    expect(componentModifiedAscending.items[2].props.title).to.equal('react');

    const componentModifiedDescending = renderIntoDocument(
      <NotesList
        notes={notes}
        orderBy="modified descending"
        selected=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    expect(componentModifiedDescending.items[0].props.title).to.equal('react');
    expect(componentModifiedDescending.items[1].props.title).to.equal('redux');
    expect(componentModifiedDescending.items[2].props.title).to.equal('immutable');

    const componentCreatedAscending = renderIntoDocument(
      <NotesList
        notes={notes}
        orderBy="created ascending"
        selected=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    expect(componentCreatedAscending.items[0].props.title).to.equal('react');
    expect(componentCreatedAscending.items[1].props.title).to.equal('redux');
    expect(componentCreatedAscending.items[2].props.title).to.equal('immutable');

    const componentCreatedDescending = renderIntoDocument(
      <NotesList
        notes={notes}
        orderBy="created descending"
        selected=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    expect(componentCreatedDescending.items[0].props.title).to.equal('immutable');
    expect(componentCreatedDescending.items[1].props.title).to.equal('redux');
    expect(componentCreatedDescending.items[2].props.title).to.equal('react');
  });
  it('orderby modify | created is printed in the timestamp header text', () => {
    const componentModified = renderIntoDocument(
      <NotesList
        notes={List.of()}
        orderBy="modified ascending"
        selected=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    expect(componentModified.timestampHeader.textContent).to.contain('Modified');

    const componentCreated = renderIntoDocument(
      <NotesList
        notes={List.of()}
        orderBy="created ascending"
        selected=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    expect(componentCreated.timestampHeader.textContent).to.contain('Created');
  });
  it('orderby ascending | descending is reflected in the header arrow', () => {
    const componentAscending = renderIntoDocument(
      <NotesList
        notes={List.of()}
        orderBy="modified ascending"
        selected=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    expect(componentAscending.arrowHeader.textContent).to.contain(UP_POINTING);

    const componentDescending = renderIntoDocument(
      <NotesList
        notes={List.of()}
        orderBy="modified descending"
        selected=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        arrowHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );

    expect(componentDescending.arrowHeader.textContent).to.contain(DOWN_POINTING);
  });
  it('clicking header arrow will call arrowHeaderClicked handler', () => {
    let wasCalled = false;
    function arrowHeaderClicked() {
      wasCalled = true;
    }
    const component = renderIntoDocument(
      <NotesList
        notes={List.of()}
        arrowHeaderClicked={arrowHeaderClicked}
        selected=""
        orderBy=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );
    Simulate.click(component.arrowHeader);

    expect(wasCalled).to.equal(true);
  });
  it('list is scrollable (in class)', () => {
    const component = shallow(
      <NotesList
        notes={List.of()}
        arrowHeaderClicked={() => null}
        selected=""
        orderBy=""
        titleHeaderClicked={() => null}
        timestampHeaderClicked={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );
    const scrollable = component.find('.scrollable');
    expect(scrollable).to.not.equal(undefined);
  });
});
