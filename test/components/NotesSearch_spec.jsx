import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesSearch from '../../src/components/NotesSearch';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('NotesSearch', () => {
  let inputStr;
  let wasCalled;
  let notesSearch;
  let component;
  let node;
  beforeEach(() => {
    inputStr = "aaaaaaayyyyyyttttthhhhhssssss";

    wasCalled = false;
    notesSearch = function(notes) {
      wasCalled = true;
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

    expect(wasCalled).to.equal(true);
  });
});
