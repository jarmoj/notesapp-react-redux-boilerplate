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
  let text;
  beforeEach(() => {
    query = "";
    notesSearch = function(_query) {
      query = _query;
    };

    component = renderIntoDocument(
      <NotesSearch notesSearch={notesSearch}/>
    );

    node = ReactDOM.findDOMNode(component._input);
  });

  it('returns the query string in notesSearch when edited', () => {
    Simulate.change(node, {target: {value: inputStr}});
    expect(query).to.equal(inputStr);
  });
});
