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
  let inputStr = "jkhiuffhiuwefhuiewhiwheiuewhf";
  let query;
  let notesSearch;
  let component;
  let node;
  beforeEach(() => {
    query = false;
    notesSearch = function(_query) {
      query = _query;
    };

    component = renderIntoDocument(
      <NotesSearch notesSearch={notesSearch}/>
    );

    node = component.refs.input;
  });

  it('the search input is displayed on the search field', () => {
    Simulate.change(node, {target: {value: inputStr}});

    expect(node.value).to.equal(inputStr);
  });
  it('calls the onSearchDone when edited', () => {
    Simulate.change(node, {target: {value: inputStr}});

    expect(query).to.equal(inputStr);
  });
});
