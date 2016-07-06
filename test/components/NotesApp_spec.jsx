import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import NotesApp from '../../src/components/NotesApp';
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

const editing = 'a1';

describe('NotesApp - Searching', () => {
  let component;
  beforeEach(() => {
    component = renderIntoDocument(
      <NotesApp/>
    );
  });
  it('search notes with empty should return all the notes', () => {
    expect(component.makeSearch("")).to.equal(notes);
  });
  it('search notes with suitably difficult should return none of the notes', () => {
    expect(component.makeSearch("not gonna find")).to.equal(List.of());
  });
  it('search notes suitably should return one of the notes', () => {
    expect(component.makeSearch("react")).to.equal(List.of(notes.get(0)));
  });
});

describe('NotesApp - Selection', () => {
  let component;
  let app;
  beforeEach(() => {
    component = renderIntoDocument(
      <NotesApp/>
    );
    app = scryRenderedDOMComponentsWithTag(component, 'div');
  });
  it('by default the notes app has no note selected', () => {
    expect(component.state.editing).to.equal(undefined);
  });
  it('onSelect handler changes the currently selected note', () => {
    component.onSelect(notes.get(0).get('id'));
    expect(component.state.editing).to.equal(notes.get(0).get('id'));
  });
  it('pressing esc will call onKeyDown', () => {
    let wasCalled = false;
    component.onKeyDown = function (e) {
      wasCalled = true;
    }
    Simulate.keyDown(app[0], {key: 'Esc', keyCode: 27, which: 27});
    expect(wasCalled);
  });
  it('calling onKeyDown with esc event will deselect current selection', () => {
    expect(notes.get(0).get('id')).to.not.equal(undefined);
    component.onSelect(notes.get(0).get('id'));
    expect(component.state.editing).to.equal(notes.get(0).get('id'));
    document.onkeydown({key: 'Esc', keyCode: 27, which: 27});
    expect(component.state.editing).to.equal(undefined);
  });
  it('calling onKeyDown with esc event will clear search input', () => {
    component.onSelect(notes.get(0).get('id'));
    ReactDOM.findDOMNode(component._search._input).value = "jkhiuh";
    document.onkeydown({key: 'Esc', keyCode: 27, which: 27});
    expect(component._search._input.value).to.equal("");
  });
});
