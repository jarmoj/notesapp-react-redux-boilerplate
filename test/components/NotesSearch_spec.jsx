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
  it('returns the query string in notesSearch when edited', () => {
    let wasCalled = "";
    let inputStr = "jkhiU/(F/&RU€%€DUF&Guihiughgdj)";
    let notesSearch = function (query) {
      wasCalled = query;
    }
    const component = renderIntoDocument(
     <NotesSearch notesSearch={notesSearch} />
    );
    Simulate.change(component._input, {target:{value: inputStr}});

    expect(wasCalled).to.equal(inputStr);
  });
});
