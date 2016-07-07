import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesApp from '../../src/containers/NotesApp';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import notes from '../test_data';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('NotesApp', () => {
  it('search notes with empty should return all the notes', () => {
    expect(false).to.equal(true);
  });
  it('search notes with suitably difficult should return none of the notes', () => {
    expect(false).to.equal(true);
  });
  it('search notes suitably should return one of the notes', () => {
    expect(false).to.equal(true);
  });
});

describe('NotesApp', () => {
  it('by default the notes app has no note selected', () => {
    expect(false).to.equal(true);
  });
  it('onSelect handler changes the currently selected note', () => {
    expect(false).to.equal(true);
  });
  it('pressing esc will call onKeyDown', () => {
    expect(false).to.equal(true);
  });
  it('calling onKeyDown with esc event will deselect current selection', () => {
    expect(false).to.equal(true);
  });
  it('calling onKeyDown with esc event will clear search input', () => {
    expect(false).to.equal(true);
  });
});
