import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import { mount, shallow } from 'enzyme';
import {NotesAppContainer, NotesApp, mapStateToProps} from '../../src/containers/NotesApp';
import {NotesListItem} from '../../src/components/NotesListItem';
import {expect} from 'chai';
import reducer from '../../src/reducers/index';
import {List, Map} from 'immutable';
import _state from '../test_data';
import * as types from '../../src/types';
import * as actionCreators from '../../src/actions/index';
import urlencode from 'urlencode';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

mockAxios = global.mockAxios;

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       scryRenderedDOMComponentsWithClass,
       scryRenderedComponentsWithType,
       Simulate} = TestUtils;

 describe('NotesApp - Default', () => {
   it('in the beginning focus goes first to search', () => {
     const component = mount(
       <NotesApp {...mapStateToProps(_state)}/>
     );
     const search = component.find("input").get(0);
     expect(search == global.document.activeElement).to.equal(true);
   });
   it('by default the notes search is empty', () => {
     const component = renderIntoDocument(
       <NotesApp {...mapStateToProps(_state)}/>
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
  const test_query = (query, expect_items_length) => {
    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actionCreators.search(query)).then(() => {
      const actions = store.getActions();
      const nextState = reducer(reducer(_state, actions[0]), actions[1]);
      const nextStore = mockStore(nextState);

      const component = mount(
        <Provider store={nextStore}>
          <NotesAppContainer/>
        </Provider>
      );
      const items = component.find("NotesListItem");
      expect(items.length).to.equal(expect_items_length);
    });
  };
  it('search notes with empty returns all the notes', () => {
    mockAxios.reset();
    mockAxios.onGet(`${actionCreators.URL_BASE}/search?q=`).reply(200, {
      notes: _state.get("notes").toJS()
    });

    return test_query("", 3);
  });
  it('search notes with nothing matching returns none of the notes', () => {
    mockAxios.reset();
    mockAxios.onGet(`${actionCreators.URL_BASE}/search?q=fdsfd7yf88732y784`).reply(200, {
      notes: []
    });

    return test_query("fdsfd7yf88732y784", 0);
  });
  it('search notes with a singular match returns one of the notes', () => {
    mockAxios.reset();
    mockAxios.onGet(`${actionCreators.URL_BASE}/search?q=react`).reply(200, {
      notes: [_state.get("notes").get(0).toJS()]
    });

    return test_query("react", 1);
  });
  it('search notes with proper common prefix returns those notes', () => {
    mockAxios.reset();
    mockAxios.onGet(`${actionCreators.URL_BASE}/search?q=re`).reply(200, {
      notes: [_state.get("notes").get(0).toJS(), _state.get("notes").get(1).toJS()]
    });

    return test_query("re", 2);
  });
});

describe('NotesApp - Selection', () => {
  it('selectNote changes the search query into the note\'s title', () => {
    const selected = 'redux';
    const getState = _state;
    const store = mockStore(getState);
    store.dispatch(actionCreators.selectNote(selected));
    const actions = store.getActions();
    const nextState = reducer(reducer(_state, actions[0]), actions[1]);
    const nextStore = mockStore(nextState);

    const component = mount(
      <Provider store={nextStore}>
        <NotesAppContainer/>
      </Provider>
    );
    const items = component.find("NotesListItem");
    const input = component.find("NotesSearch");
    expect(items.at(1).props().title).to.equal(input.get(0)._input.value);
  });

  it('selectNote changes the currently selected note in list', () => {
    const selected = 'redux';
    const getState = _state;
    const store = mockStore(getState);
    store.dispatch(actionCreators.selectNote(selected));
    const actions = store.getActions();
    const nextState = reducer(reducer(_state, actions[0]), actions[1]);
    const nextStore = mockStore(nextState);

    const component = mount(
      <Provider store={nextStore}>
        <NotesAppContainer/>
      </Provider>
    );
    const items = component.find("NotesListItem");
    expect(items.at(1).props().selected).to.equal(true);
  });
});

describe('NotesApp - Key - Escape', () => {
  it('calling escapePressed() will call clearSelection()', () => {
    mockAxios.reset();
    mockAxios.onGet(`${actionCreators.SEARCH_URL}`).reply(200, {
      notes: _state.get("notes").toJS()
    });

    let wasCalled = false;
    const clearSelection = () => {
      wasCalled = true;
    }
    const component = mount(
        <NotesApp clearSelection={clearSelection} orderBy=""/>
    );
    const app = component.find("NotesApp").get(0);
    app.escapePressed();
    expect(wasCalled).to.equal(true);
  });
  it('pressing esc will call toggleAcendingDescending() to default to descending', () => {
    let wasCalled = false;
    const toggleAcendingDescending = () => {
      wasCalled = true;
    }

    const componentTrueCase = mount(
        <NotesApp
          toggleAcendingDescending={toggleAcendingDescending}
          clearSelection={() => false}
          orderBy="title ascending"/>
    );
    const appTrueCase = componentTrueCase.find("NotesApp").get(0);
    appTrueCase.escapePressed();
    expect(wasCalled).to.equal(true);

    wasCalled = false;
    const componentFalseCase = mount(
        <NotesApp
          toggleAcendingDescending={toggleAcendingDescending}
          clearSelection={() => false}
          orderBy="title descending"/>
    );
    const appFalseCase = componentFalseCase.find("NotesApp").get(0);
    appFalseCase.escapePressed();
    expect(wasCalled).to.equal(false);

  });
  it('calling calling clearSelection() will deselect current selection', () => {
    const store = mockStore(_state.set("query", "something"));
    return store.dispatch(actionCreators.clearSelection()).then(() => {
      const actions = store.getActions();
      const nextState = reducer(reducer(reducer(_state, actions[0]), actions[1]), actions[2]);
      const nextStore = mockStore(nextState);

      const component = mount(
        <Provider store={nextStore}>
          <NotesAppContainer/>
        </Provider>
      );
      const search = component.find("NotesSearch");
      expect(search.props().selected).to.equal(null);
    });
  });
  it('calling onKeyDown with esc event will clear search input', () => {
    const store = mockStore(_state.set("query", "something"));
    return store.dispatch(actionCreators.clearSelection()).then(() => {
      const actions = store.getActions();
      const nextState = reducer(reducer(reducer(_state, actions[0]), actions[1]), actions[2]);
      const nextStore = mockStore(nextState);

      const component = mount(
        <Provider store={nextStore}>
          <NotesAppContainer/>
        </Provider>
      );
      const search = component.find("NotesSearch");
      expect(search.props().query).to.equal("");
    });
  });
});
