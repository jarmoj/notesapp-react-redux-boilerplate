import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import NotesSearch from '../../src/components/NotesSearch';


const { renderIntoDocument,
        Simulate } = TestUtils;

describe('NotesSearch', () => {
  it('returns the query string in search() when edited', () => {
    let wasCalled = '';
    const inputStr = 'jkhiU/(F/&RU€%€DUF&Guihiughgdj)';
    function search(text) {
      wasCalled = text;
    }
    const component = renderIntoDocument(
      <NotesSearch
        search={search}
        query=""
        selected=""
        returnPressed={() => null}
      />
    );
    Simulate.change(component.input, { target: { value: inputStr } });
    component.search.flush();

    expect(wasCalled).to.equal(inputStr);
  });

  it('pressing return will call returnPressed()', () => {
    let wasCalled = false;
    function callback() {
      wasCalled = true;
    }
    const component = mount(
      <NotesSearch
        returnPressed={callback}
        search={() => null}
        query=""
        selected=""
      />
    );
    const search = component.find('input');
    search.simulate('keyUp', { keyCode: 13, which: 13, key: 'Enter' });
    expect(wasCalled).to.equal(true);
  });

  it.skip('TODO: test returnPressed will remove selection and make it also part of query', () => {
    expect(true).to.equal(false);
  });

  it.skip('TODO: test complete selected with highlight if it starts with the query part', () => {
    expect(true).to.equal(false);
  });

  it.skip('TODO: test arrow right include highlighted into query', () => {
    expect(true).to.equal(false);
  });

  it.skip('TODO: test arrow right include highlighted into query', () => {
    expect(true).to.equal(false);
  });

});
