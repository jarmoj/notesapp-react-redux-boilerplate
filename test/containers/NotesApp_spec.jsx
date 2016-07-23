import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import {NotesAppContainer, NotesApp, mapStateToProps} from '../../src/containers/NotesApp';
import {NotesListItem} from '../../src/components/NotesListItem';
import {expect} from 'chai';
import reducer from '../../src/reducers/index';
import {List, Map} from 'immutable';
import _state from '../test_data';
import * as types from '../../src/types';
import * as actions from '../../src/actions/index';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import urlencode from 'urlencode';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mockAxios = new MockAdapter(axios);

mockAxios.onGet(`${actions.URL_BASE}/search?q=`).reply(200, {
  notes: _state.get("notes").toJS()
});

mockAxios.onGet(`${actions.URL_BASE}/search?q=` + urlencode("test query")).reply(200, {
  notes: []
});

mockAxios.onGet(`${actions.URL_BASE}/search?q=react`).reply(200, {
  notes: [_state.get("notes").get(0).toJS()]
});

mockAxios.onGet(`${actions.URL_BASE}/search?q=re`).reply(200, {
  notes: [_state.get("notes").get(0).toJS(), _state.get("notes").get(1).toJS()]
});

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

 describe('NotesApp - Default', () => {
   it('by default the notes search is empty', () => {
     const component = renderIntoDocument(
       <NotesApp {...mapStateToProps(_state)} />
     );
     expect(component._search._input.value).to.equal("");
   });
   it('by default the notes app has no note selected', () => {
     const component = renderIntoDocument(
       <NotesApp {...mapStateToProps(_state)}/>
     );
     let agg = false;
     component._list._items.every(item => {
       agg = agg || item._row.classList.contains('selected');
     });
     expect(agg).to.equal(false);
   });
   it('by default the notes edit is empty and disabled', () => {
     const component = renderIntoDocument(
       <NotesApp {...mapStateToProps(_state)}/>
     );
     expect(component._edit._textarea.value).to.equal("");
     expect(component._edit._textarea.classList.contains('disabled')).to.equal(true);
   });
 });

describe('NotesApp - Search', () => {
  it('search notes with empty returns all the notes', () => {
    const query="";
    const getState = _state;
    const store = mockStore(getState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <NotesAppContainer/>
      </Provider>
    );
    store.dispatch(actions.search(query)).then(() => {
      const items = scryRenderedDOMComponentsWithType(component, NotesListItem);
      expect(items.length).to.equal(3);
    });
  });
  it('search notes with nothing matching returns none of the notes', () => {
    const query="fdsfd7yf88732y784";
    const getState = _state;
    const store = mockStore(getState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <NotesAppContainer/>
      </Provider>
    );
    store.dispatch(actions.search(query)).then(() => {
      const items = scryRenderedDOMComponentsWithType(component, NotesListItem);
      expect(items.length).to.equal(0);
    });
  });
  it('search notes with a singular match returns one of the notes', () => {
    const query="react";
    const getState = _state;
    const store = mockStore(getState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <NotesAppContainer/>
      </Provider>
    );
    store.dispatch(actions.search(query)).then(() => {
      const items = scryRenderedDOMComponentsWithType(component, NotesListItem);
      expect(items.length).to.equal(1);
    });
  });
  it('search notes with proper common prefix returns those notes', () => {
    const query="re";
    const getState = _state;
    const store = mockStore(getState);
    const component = renderIntoDocument(
      <Provider store={store}>
        <NotesAppContainer/>
      </Provider>
    );
    store.dispatch(actions.search(query)).then(() => {
      const items = scryRenderedDOMComponentsWithType(component, NotesListItem);
      expect(items.length).to.equal(2);
    });
  });
});

describe('NotesApp - Selection', () => {
  it('selectNote changes the search query into the note\'s title', () => {
    const component = renderIntoDocument(
      <NotesApp {...mapStateToProps(_state)} />
    );
    expect(component._search._input.value).to.equal("");
  });
  it('selectNote changes the currently selected note in list', () => {
    expect(false).to.equal(true);
  });
  it('clearSelection handler changes the currently selected note', () => {
    expect(false).to.equal(true);
  });
});

describe('NotesApp - Key - Escape', () => {
  it('pressing esc will call escapePressed()', () => {
    expect(false).to.equal(true);
  });
  it('calling onKeyDown with esc event will deselect current selection', () => {
    expect(false).to.equal(true);
  });
  it('calling onKeyDown with esc event will clear search input', () => {
    expect(false).to.equal(true);
  });
  it('clicking esc will return order to default modified order', () => {
    expect(false).to.equal(true);
  });
});
