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

  it.skip('TODO: test autocompletes a selected with highlight if selected starts with the query part', () => {
    expect(true).to.equal(false);
  });
});
