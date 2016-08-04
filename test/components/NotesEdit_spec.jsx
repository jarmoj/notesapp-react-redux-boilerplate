import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesEdit from '../../src/components/NotesEdit';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import notes from '../test_data';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('NotesEdit', () => {
  it('returns the changed text in noteEdited callback when edited', () => {
    let wasCalled = "";
    let inputStr = "jkhiU/(F/&RU€%€DUF&Guihiughgdj)";
    let noteEdited = function (text) {
      wasCalled = text;
    }
    const component = renderIntoDocument(
     <NotesEdit noteEdited={noteEdited} />
    );
    Simulate.change(component.textarea, {target:{value: inputStr}});

    expect(wasCalled).to.equal(inputStr);
  });

  it('if none selected or no note returned with selected the textarea is disabled', () => {
  });

});
