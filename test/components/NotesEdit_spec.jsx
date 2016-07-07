import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesEdit from '../../src/components/NotesEdit';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

const notes = List.of(
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
