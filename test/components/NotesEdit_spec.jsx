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
  let inputStr = "jhiiubkugkugkugku";
  let wasCalled = "";
  let onEditText = function (id, newText) {
    wasCalled = newText;
  }
  let component;
  let edit;
  let node;
  beforeEach(() => {
    component = renderIntoDocument(
      <NotesEdit
        note={notes.get(0)}
        ref={(c) => edit = c}
        onEdit={onEditText}
        />
    );
    node = ReactDOM.findDOMNode(edit._textarea);
  });
  it('changing the edit will call the onEditText', () => {
    component.onEditText = onEditText;
    Simulate.change(node, {target: {value: inputStr}});
    expect(wasCalled).to.equal(inputStr);
  });
});
