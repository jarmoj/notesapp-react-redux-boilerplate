import React from 'react';
import ReactDOM from 'react-dom';
import { List, Map } from 'immutable';
import { compose, createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import * as actions from './actions/index';
import { NotesAppContainer } from './containers/NotesApp';
import _state from '../test/test_data';
import * as types from './types';
import thunk from 'redux-thunk';

function createToolsStore(rootReducer) {
  return createStore(
    rootReducer,
    _state,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}

const store = createToolsStore(reducer);

store.dispatch(actions.search(''));

if (typeof window !== 'undefined') {
  require('./styles/index.scss');
}

ReactDOM.render(
  <Provider store={store}>
    <NotesAppContainer />
  </Provider>,
  document.getElementById('app')
);
