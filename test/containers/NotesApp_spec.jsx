import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {NotesApp, mapStateToProps} from '../../src/containers/NotesApp';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import _state from '../test_data';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

 describe('NotesApp - Default', () => {
   it('by default the notes search is empty', () => {
     const component = renderIntoDocument(
       <NotesApp {...mapStateToProps(_state)}/>
     );
     expect(component._search._input.value).to.equal("");
   });
   it('by default the notes app has no note selected', () => {
     const component = renderIntoDocument(
       <NotesApp {...mapStateToProps(_state)}/>
     );
     let agg = false;
     component._list._items.every(item => {
       agg = agg || item._row.classList.contains('selected');
     });
     expect(agg).to.equal(false);
   });
   it('by default the notes edit is empty and disabled', () => {
     expect(false).to.equal(true);
   });
 });

describe('NotesApp - Search', () => {
  it('search notes with empty returns all the notes', () => {
    expect(false).to.equal(true);
  });
  it('search notes with nothing matching returns none of the notes', () => {
    expect(false).to.equal(true);
  });
  it('search notes with a singular match returns one of the notes', () => {
    expect(false).to.equal(true);
  });
  it('search notes with proper common prefix returns those notes', () => {
    expect(false).to.equal(true);
  });
});

describe('NotesApp - Selection', () => {
  it('selectNote changes the search query into the note\'s title', () => {
    expect(false).to.equal(true);
  });
  it('selectNote changes the currently selected note in list', () => {
    expect(false).to.equal(true);
  });
  it('clearSelection handler changes the currently selected note', () => {
    expect(false).to.equal(true);
  });
});

describe('NotesApp - Key - Escape', () => {
  it('pressing esc will call escapePressed()', () => {
    expect(false).to.equal(true);
  });
  it('calling onKeyDown with esc event will deselect current selection', () => {
    expect(false).to.equal(true);
  });
  it('calling onKeyDown with esc event will clear search input', () => {
    expect(false).to.equal(true);
  });
  it('clicking esc will return order to default modified order', () => {
    expect(false).to.equal(true);
  });
});
