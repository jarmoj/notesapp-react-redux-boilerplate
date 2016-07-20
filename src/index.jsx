import React from 'react';
import ReactDOM from 'react-dom';
import { List, Map } from 'immutable';
import { compose, createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import { NotesAppContainer } from './containers/NotesApp';
import _state from '../test/test_data';
import * as types from './types';

createThunkStore(rootReducer) {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}

const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createThunkStore);
const store = createStoreDevTools(reducer);

store.dispatch({
  type: types.SET_STATE,
  _state
});

if (typeof window !== 'undefined') {
  require('./styles/index.scss');
}

ReactDOM.render(
  <Provider store={store}>
    <NotesAppContainer />
  </Provider>,
  document.getElementById('app')
);
