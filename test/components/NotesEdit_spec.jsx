import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import NotesEdit from '../../src/components/NotesEdit';
import notes from '../test_data';

const { renderIntoDocument,
        Simulate } = TestUtils;

describe('NotesEdit', () => {
  it('returns the changed text in noteEdited callback when edited', () => {
    let wasCalled = '';
    const inputStr = 'jkhiU/(F/&RU€%€DUF&Guihiughgdj)';
    function noteEdited(text) {
      wasCalled = text;
    }
    const component = renderIntoDocument(
      <NotesEdit noteEdited={noteEdited} />
    );
    Simulate.change(component.textarea, { target: { value: inputStr } });

    expect(wasCalled).to.equal(inputStr);
  });

  it.skip('TODO: test if nothing selected or note the textarea is disabled', () => {
    expect(true).to.equal(false);
  });
});
