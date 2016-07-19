import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {NotesSearch} from '../../src/components/NotesSearch';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('NotesSearch', () => {
  it('returns the query string in setQuery when edited', () => {
    let wasCalled = "";
    let inputStr = "jkhiU/(F/&RU€%€DUF&Guihiughgdj)";
    let setQuery = function (query) {
      wasCalled = query;
    }
    const component = renderIntoDocument(
     <NotesSearch setQuery={setQuery} />
    );
    Simulate.change(component._input, {target:{value: inputStr}});

    expect(wasCalled).to.equal(inputStr);
  });
});
