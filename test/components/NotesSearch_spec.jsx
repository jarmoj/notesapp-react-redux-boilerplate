import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesSearch from '../../src/components/NotesSearch';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

const notes_expect = List.of(
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

describe('NotesSearch', () => {
  let inputStr;
  let notesGot;
  let notesSearch;
  let component;
  let node;
  beforeEach(() => {
    inputStr = "aaaaaaayyyyyyttttthhhhhssssss";

    notesGot = undefined;
    notesSearch = function(_notes) {
      notesGot = _notes;
    };

    component = renderIntoDocument(
      <NotesSearch onSearchDone={notesSearch}/>
    );

    node = component.refs.input;
  });

  it('the search input is displayed on the search field', () => {
    Simulate.change(node, {target: {value: inputStr}});

    expect(node.value).to.equal(inputStr);
  });
  it('calls the onSearchDone when edited', () => {
    Simulate.change(node, {target: {value: inputStr}});

    expect(notesGot).to.equal(List.of());
  });
  it('empty search term returns all the notes', () => {
    Simulate.change(node, {target: {value: ""}});

    expect(notesGot).to.equal(notes_expect);
  });
  it('a suitable restricting search term returns only none', () => {
    Simulate.change(node, {target: {value: "not gonna find"}});

    expect(notesGot).to.equal(List.of());
  });
  it('a suitable restricting search term returns only one', () => {
    Simulate.change(node, {target: {value: "react"}});

    expect(notesGot).to.equal(notes_expect);
  });    
});
