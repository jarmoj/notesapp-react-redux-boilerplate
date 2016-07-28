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
      state: _state
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
    const timestamp = (new Date()).toISOString();
    const initialState = _state;
    const initialNotes = _state.get('notes');
    const title = 'test title string';
    const text = 'test content for note text';
    const action = {
      type: types.ADD_NOTE,
      title,
      text,
      timestamp
    }
    const nextState = reducer(initialState, action);
    const nextNotes = nextState.get('notes');

    expect(nextNotes.count()).to.equal(initialNotes.count() + 1);

    const newNote = nextNotes.find(note => {
      return note.get('title') == title;
    });

    expect(newNote.get('text') == text);

    const modified = newNote.getIn(['timestamp', 'modified']);
    const created = newNote.getIn(['timestamp', 'created']);

    const modifiedDate = new Date(modified);
    const createdDate = new Date(created);

    expect(modifiedDate.toISOString()).to.equal(createdDate.toISOString());
  });

  it('handles SELECT_NOTE by changing selected state', () => {
    const initialState = _state;
    const title = 'redux';
    const action = {
      type: types.SELECT_NOTE,
      title
    }
    const nextState = reducer(initialState, action);

    expect(nextState.get('selected')).to.equal(title);
  });

  it('handles EDIT_NOTE by changing the selected note contents', () => {
    const timestamp = (new Date()).toISOString();
    const initialState = _state;
    const initialNotes = _state.get('notes');
    const selected = 'redux';
    const title = 'some new title';
    const text = 'some new content text';
    const action = {
      type: types.EDIT_NOTE,
      selected,
      title,
      text,
      timestamp
    }
    const initialNote = initialNotes.find(note => note.get('title') == selected);

    const initialModified = initialNote.getIn(['timestamp', 'modified']);

    const nextState = reducer(initialState, action);
    const nextNotes = nextState.get('notes');

    expect(nextNotes.count()).to.equal(initialNotes.count());

    const newNote = nextNotes.find(note => note.get('title') == title);

    const modified = newNote.getIn(['timestamp', 'modified']);

    expect((new Date(modified)).toISOString()).to.not.equal((new Date(initialModified)).toISOString());

    expect(newNote.get('title')).to.equal(title);
    expect(newNote.get('text')).to.equal(text);
});

  it('handles DELETE_NOTE by deleting the note from notes', () => {
    const initialState = _state;
    const selected = 'redux';
    const action = {
      type: types.DELETE_NOTE,
      selected
    }
    const nextState = reducer(initialState, action);

    expect(nextState.get('notes').count()).to.equal(initialState.get('notes').count() - 1);

    const deletedIndex = nextState.get('notes').findIndex(note => note.get('title') == selected);

    expect(deletedIndex).to.equal(-1);
  });

  it('handles ORDER_BY_TITLE by setting list order be by title', () => {
    const initialState = _state;
    const action = {
      type: types.ORDER_BY_TITLE,
    }
    expect(initialState.get('orderBy')).to.not.contain("title");

    const nextState = reducer(initialState, action);

    expect(nextState.get('orderBy')).to.contain('title');
  });

  it('handles ORDER_BY_MODIFIED by setting list order be by modified', () => {
    const initialState = _state;
    const action0 = {
      type: types.ORDER_BY_TITLE,
    }
    const action = {
      type: types.ORDER_BY_MODIFIED,
    }
    const nextState0 = reducer(initialState, action0);

    expect(nextState0.get('orderBy')).to.not.contain("modified");

    const nextState = reducer(nextState0, action);

    expect(nextState.get('orderBy')).to.contain('modified');
  });

  it('handles ORDER_BY_CREATED by setting list order be by created', () => {
    const initialState = _state;
    const action = {
      type: types.ORDER_BY_CREATED,
    }
    expect(initialState.get('orderBy')).to.not.contain("created");

    const nextState = reducer(initialState, action);

    expect(nextState.get('orderBy')).to.contain('created');
  });

  it('handles TOGGLE_ASCENDING_DESCENDING by toggling the list to be orderder between ascending / descending', () => {
    const initialState = _state;
    const action = {
      type: types.TOGGLE_ASCENDING_DESCENDING,
    }
    expect(initialState.get('orderBy')).to.contain('descending');

    const nextState = reducer(initialState, action);

    expect(nextState.get('orderBy')).to.contain('ascending');
  });

});
