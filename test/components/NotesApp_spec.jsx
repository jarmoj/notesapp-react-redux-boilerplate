import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesApp from '../../src/components/NotesApp';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag} = TestUtils;

const notes = List.of(
  Map({
    id: 'a1', title: 'react', text: 'Stuff about React.',
    timestamp: {
      created: 'EEST 1970-10-12 11:33',
      modified: 'EEST 1980-10-12 12:33'
    }
  }),
  Map({
    id: '2e', title: 'redux', text: 'Stuff about Redux.',
    timestamp: {
      created: 'EEST 1970-10-12 11:34',
      modified: 'EEST 1980-10-12 12:32'
    }
  }),
  Map({
    id: '3r', title: 'immutable', text: 'Stuff about Immutable.',
    timestamp: {
      created: 'EEST 1970-10-12 11:35',
      modified: 'EEST 1980-10-12 12:31'
    }
  })
);

const editing = 'a1';

describe('NotesApp', () => {
  let component;
  beforeEach(() => {
    component = renderIntoDocument(
      <NotesApp notes={notes} editing={editing} />
    );
  });
  it('search notes with empty should return all the notes', () => {
    expect(component.makeSearch("")).to.equal(notes);
  });
  it('search notes with suitably difficult should return none of the notes', () => {
    expect(component.makeSearch("not gonna find")).to.equal(List.of());
  });
  it('search notes suitably should return one of the notes', () => {
    expect(component.makeSearch("react")).to.equal(notes[0]);
  });
});
