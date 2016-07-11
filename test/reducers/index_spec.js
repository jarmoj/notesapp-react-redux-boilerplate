import {List, Map, fromJS, Set} from 'immutable';
import {expect} from 'chai';
import reducer from '../../src/reducers/index';
import _state from '../test_data';
import * as types from '../../src/types.js';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: types.SET_STATE,
      state: initialState
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(_state);
  });

  it('handles SET_QUERY by changing the query from previous to new', () => {
    const initialState = _state;
    const query = 'test query string';
    const action = {
      type: types.SET_QUERY,
      query
    }
    const expectedState = _state.setIn(['query'], query);

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(expectedState);
  });

  it('handles ADD_NOTE by adding note to notes of the state', () => {
    const initialState = _state;
    const title = 'test title string';
    const text = 'test content for note text';
    const action = {
      type: types.ADD_NOTE,
      title,
      text
    }
    const newNote = Map({
      title: title,
      text: text,
      timestamp: Map({
        created: 'EEST 1971-10-12 11:33',
        modified: 'EEST 1981-10-12 12:33'
      })
    });
    const newNotes = _state.get('notes').push(newNote);
    const nextState = reducer(initialState, action);

    expect(nextState.get('notes')).to.equal(expectedState);
  });

  it('handles SELECT_NOTE by changing selected state', () => {
    const initialState = _state;
    const title = 'redux';
    const action = {
      type: types.SELECT_NOTE,
      title
    }
    const expectedState = _state.setIn(['selected'], title);
    const nextState = reducer(initialState, action);

    expect(nextState.get('selected')).to.equal(title);
  });

  it('handles EDIT_NOTE by changing the selected note contents', () => {
    const initialState = _state;
    const selected = 'redux';
    const title = 'some new title';
    const text = 'some new content text';
    const action = {
      type: types.EDIT_NOTE,
      title,
      text
    }
    const newNotes = _state.get('notes').list = list.update(
      list.findIndex(function(item) {
        return item.get("title") === selected
      }),
      function(item) {
        return item.set("title", title);
        return item.set("text", text);
      }
    );
    const nextState = reducer(initialState, action);

    expect(Set(nextState.get('notes'))).to.equal(Set(newNotes));
  });

  it('handles DELETE_NOTE by deleting the note from notes', () => {
    const initialState = _state;
    const selected = 'redux';
    const action = {
      type: types.DELETE_NOTE,
      selected
    }
    const newNotes = _state.get('notes').list = list.delete(
      list.findIndex(function(item) {
        return item.get("title") === selected
      })
    );

    const nextState = reducer(initialState, action);

    expect(Set(nextState.get('notes'))).to.equal(Set(newNotes));
  });

  types.TOGGLE_ORDER_BY
  it('handles TOGGLE_ORDER_BY by toggling the order_by in state', () => {
    const initialState = _state;
    const action = {
      type: types.TOGGLE_ORDER_BY,
    }
    const prevState = initialState.get('orderBy');

    expect(prevState).to.equal('modified');

    const nextState = reducer(initialState, action);

    expect(nextState.get('orderBy')).to.equal('created');

    const nextState2 = reducer(nextState, action);

    expect(nextState.get('orderBy')).to.equal('modified');
  });

});
