import React from 'react';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import { mount, shallow } from 'enzyme';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import urlencode from 'urlencode';
import configureStore from 'redux-mock-store';
import { List } from 'immutable';
import thunk from 'redux-thunk';
import { NotesAppContainer, NotesApp, mapStateToProps } from '../../src/containers/NotesApp';
import reducer from '../../src/reducers/index';
import _state from '../test_data';
import * as actionCreators from '../../src/actions/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const { renderIntoDocument } = TestUtils;

describe('NotesApp - Default', () => {
  function makeDefault() {
    return mount(
      <NotesApp
        {...mapStateToProps(_state)}
        toggleAscendingDescending={() => null}
        clearSelection={() => null}
        orderByTitle={() => null}
        orderByModified={() => null}
        orderByCreated={() => null}
        addNote={() => null}
        editNote={() => null}
        search={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );
  }
  it('in the beginning focus goes first to search', () => {
    const component = makeDefault();
    const search = component.find('input').get(0);
    expect(search === global.document.activeElement).to.equal(true);
  });

  it('by default the notes search is empty', () => {
    const component = makeDefault();
    const input = component.find('input').get(0);
    expect(input.value).to.equal('');
  });

  it('by default the notes app has no note selected', () => {
    const component = makeDefault();
    const items = component.find('tr');
    const agg = items.every(row => !row.hasClass('selected'));
    expect(agg).to.equal(false);
  });

  it('by default the notes edit is empty and disabled', () => {
    const component = makeDefault();
    const edit = component.find('NotesEdit').get(0);
    expect(edit.textarea.value).to.equal('');
    expect(edit.textarea.classList.contains('disabled')).to.equal(true);
  });
});

describe('NotesApp - Search', () => {
  const testQuery = (query, expectitemsLength) => {
    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actionCreators.search(query)).then(() => {
      const actions = store.getActions();
      const nextState = reducer(reducer(_state, actions[0]), actions[1]);
      const nextStore = mockStore(nextState);

      const component = mount(
        <Provider store={nextStore}>
          <NotesAppContainer />
        </Provider>
      );
      const items = component.find('NotesListItem');
      expect(items.length).to.equal(expectitemsLength);
    });
  };

  it('search notes with empty returns all the notes', () => {
    global.mockAxios.reset();
    global.mockAxios.onGet(`${actionCreators.URL_BASE}/search?q=`).reply(200, {
      notes: _state.get('notes').toJS(),
    });

    return testQuery('', 3);
  });

  it('search notes with nothing matching returns none of the notes', () => {
    global.mockAxios.reset();
    global.mockAxios.onGet(`${actionCreators.URL_BASE}/search?q=fdsfd7yf88732y784`).reply(200, {
      notes: [],
    });

    return testQuery('fdsfd7yf88732y784', 0);
  });

  it('search notes with a singular match returns one of the notes', () => {
    global.mockAxios.reset();
    global.mockAxios.onGet(`${actionCreators.URL_BASE}/search?q=react`).reply(200, {
      notes: [_state.get('notes').get(0).toJS()],
    });

    return testQuery('react', 1);
  });

  it('search notes with proper common prefix returns those notes', () => {
    global.mockAxios.reset();
    global.mockAxios.onGet(`${actionCreators.URL_BASE}/search?q=re`).reply(200, {
      notes: [_state.get('notes').get(0).toJS(), _state.get('notes').get(1).toJS()],
    });

    return testQuery('re', 2);
  });

  it('with matches will select first one and highlight part not yet written', () => {
    global.mockAxios.reset();
    global.mockAxios.onGet(`${actionCreators.URL_BASE}/search?q=re`).reply(200, {
      notes: [_state.get('notes').get(0).toJS(), _state.get('notes').get(1).toJS()],
    });

    const query = 're';
    const getState = _state;
    const store = mockStore(getState);
    return store.dispatch(actionCreators.search(query)).then(() => {
      const actions = store.getActions();
      const nextState = reducer(reducer(reducer(_state, actions[0]), actions[1]), actions[2]);
      const nextStore = mockStore(nextState);

      const component = mount(
        <Provider store={nextStore}>
          <NotesAppContainer />
        </Provider>
      );

      const items = component.find('NotesListItem');
      const search = component.find('NotesSearch').get(0);
      search.componentWillReceiveProps(search.props); // need to trigger re-render
      const input = component.find('input').get(0);

      expect(items.at(0).props().isSelected).to.equal(true);
      expect(input.selectionStart).to.equal(2);
      expect(input.selectionEnd).to.equal(5);
    });
  });
});

describe('NotesApp - Selection', () => {
  it('selectNote changes the search query into the note\'s title', () => {
    const selected = 'redu';
    const getState = _state;
    const store = mockStore(getState);
    store.dispatch(actionCreators.selectNote(selected));
    const actions = store.getActions();
    const nextState = reducer(reducer(_state, actions[0]), actions[1]);
    const nextStore = mockStore(nextState);

    const component = mount(
      <Provider store={nextStore}>
        <NotesAppContainer />
      </Provider>
    );
    const search = component.find('NotesSearch');

    expect(search.get(0).input.value).to.equal(selected);
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
        <NotesAppContainer />
      </Provider>
    );

    component.find('NotesListItem').forEach(node => {
      if (node.props().title === 'redux') {
        expect(node.props().isSelected).to.equal(true);
      } else {
        expect(node.props().isSelected).to.equal(false);
      }
    });
  });
});

describe('NotesApp - Key - Escape', () => {
  it('calling escapePressed() will call clearSelection()', () => {
    global.mockAxios.reset();
    global.mockAxios.onGet(`${actionCreators.SEARCH_URL}`).reply(200, {
      notes: _state.get('notes').toJS(),
    });

    let wasCalled = false;
    function clearSelection() {
      wasCalled = true;
    }
    const component = mount(
      <NotesApp
        clearSelection={clearSelection}
        {...mapStateToProps(_state)}
        toggleAscendingDescending={() => null}
        orderByTitle={() => null}
        orderByModified={() => null}
        orderByCreated={() => null}
        addNote={() => null}
        editNote={() => null}
        search={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );
    const app = component.find('NotesApp').get(0);
    app.escapePressed();
    expect(wasCalled).to.equal(true);
  });

  it('pressing esc will call toggleAscendingDescending() to default to (a/de)scending', () => {
    let wasCalled = false;
    function toggleAscendingDescending() {
      wasCalled = true;
    }
    const componentTrueCase = mount(
      <NotesApp
        toggleAscendingDescending={toggleAscendingDescending}
        clearSelection={() => false}
        orderBy="title descending"
        query=""
        notes={List.of()}
        selected=""
        orderByTitle={() => null}
        orderByModified={() => null}
        orderByCreated={() => null}
        addNote={() => null}
        editNote={() => null}
        search={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );
    const appTrueCase = componentTrueCase.find('NotesApp').get(0);
    appTrueCase.escapePressed();
    expect(wasCalled).to.equal(true);

    wasCalled = false;
    const componentFalseCase = mount(
      <NotesApp
        toggleAscendingDescending={toggleAscendingDescending}
        clearSelection={() => false}
        orderBy="title ascending"
        query=""
        notes={List.of()}
        selected=""
        orderByTitle={() => null}
        orderByModified={() => null}
        orderByCreated={() => null}
        addNote={() => null}
        editNote={() => null}
        search={() => null}
        selectNote={() => null}
        deleteNote={() => null}
      />
    );
    const appFalseCase = componentFalseCase.find('NotesApp').get(0);
    appFalseCase.escapePressed();
    expect(wasCalled).to.equal(false);
  });

  it('calling calling clearSelection() will deselect current selection', () => {
    const store = mockStore(_state.set('query', 'something'));
    return store.dispatch(actionCreators.clearSelection()).then(() => {
      const actions = store.getActions();
      const nextState = reducer(reducer(reducer(_state, actions[0]), actions[1]), actions[2]);
      const nextStore = mockStore(nextState);

      const component = mount(
        <Provider store={nextStore}>
          <NotesAppContainer />
        </Provider>
      );
      const search = component.find('NotesSearch');
      expect(search.props().selected).to.equal(null);
    });
  });

  it('calling onKeyDown with esc event will clear search input', () => {
    const store = mockStore(_state.set('query', 'something'));
    return store.dispatch(actionCreators.clearSelection()).then(() => {
      const actions = store.getActions();
      const nextState = reducer(reducer(reducer(_state, actions[0]), actions[1]), actions[2]);
      const nextStore = mockStore(nextState);

      const component = mount(
        <Provider store={nextStore}>
          <NotesAppContainer />
        </Provider>
      );
      const search = component.find('NotesSearch');
      expect(search.props().query).to.equal('');
    });
  });
});

describe('NotesApp - Focus', () => {
  it('TODO: test focus moves to edit field when new note is created / exists', () => {
    expect(false).to.equal(true);
  });

  it('TODO: test clicking list will keep focus in search', () => {
    expect(false).to.equal(true);
  });
});

describe('NotesApp - TODO', () => {
  it('TODO: webpack compile to dist with minimize and obfuscate', () => {
    expect(false).to.equal(true);
  });

  it('TODO: add travis conf', () => {
    expect(false).to.equal(true);
  });

  it('TODO: deploy to heroku automatically', () => {
    expect(false).to.equal(true);
  });

  it('TODO: add routes', () => {
    expect(false).to.equal(true);
  });

  it('TODO: add polling for changes in notes on server', () => {
    expect(false).to.equal(true);
  });
});
