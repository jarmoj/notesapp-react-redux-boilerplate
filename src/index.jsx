import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';

import NotesApp from './components/NotesApp';

if (typeof window !== 'undefined') {
  require('./styles/index.scss');
}

ReactDOM.render(
  <NotesApp/>,
  document.getElementById('app')
);
