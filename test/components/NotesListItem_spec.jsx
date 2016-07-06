import React from 'react';
import TestUtils from 'react-addons-test-utils';
import NotesListItem from '../../src/components/NotesListItem';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag} = TestUtils;

const notes = List.of(
  Map({
    id: 'a1', title: 'react', text: 'Stuff about React.',
    timestamp: {
      created: 'EEST 1970-10-12 11:33',
      modified: 'EEST 1980-10-12 12:33'
    }
  })
);

describe('NotesListItem', () => {
 it('renders a list item with its title contents, beginning of text body, and date modified/created depending orderBy', () => {
   const orderBys = ["created", "modified"];

   orderBys.forEach(function (orderBy) {
     const item = notes.get(0);
     let onSelect = function (id) {

     };
     const component = renderIntoDocument(
       <NotesListItem key={item.get('id')}
                      id={item.get('id')}
                      title={item.get('title')}
                      text={item.get('text')}
                      timestamp={item.get('timestamp')}
                      orderBy={orderBy}
                      onSelect={onSelect} />
     );
     const items = scryRenderedDOMComponentsWithTag(component, 'tr');

     expect(items.length).to.equal(1);
     expect(items[0].textContent).to.contain('react');
     expect(items[0].textContent).to.contain(item.get('text'));
     expect(items[0].textContent).to.contain(item.get('timestamp')[orderBy]);
   });
 });
});
