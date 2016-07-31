import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {NotesSearch} from '../../src/components/NotesSearch';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import { mount, shallow } from 'enzyme';


const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('NotesSearch', () => {
  it('returns the query string in search() when edited', () => {
    let wasCalled = "";
    let inputStr = "jkhiU/(F/&RU€%€DUF&Guihiughgdj)";
    let search = function (query) {
      wasCalled = query;
    }
    const component = renderIntoDocument(
     <NotesSearch search={search} />
    );
    Simulate.change(component._input, {target:{value: inputStr}});

    expect(wasCalled).to.equal(inputStr);
  });
  it('pressing return will call returnPressed()', () => {
    let wasCalled = false;
    const callback = (e) => {
      wasCalled = true;
    }
    const component = mount(
        <NotesSearch returnPressed={callback}/>
    );
    const search = component.find("input");
    search.simulate("keyUp", { keyCode: 13, which: 13, key: "Enter" });
    expect(wasCalled).to.equal(true);
  });
});
