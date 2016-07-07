import React from 'react';
import TestUtils from 'react-addons-test-utils';
import NotesListItem from '../../src/components/NotesListItem';
import {expect} from 'chai';
import {List, Map} from 'immutable';
import notes from '../test_data';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag} = TestUtils;

describe('NotesListItem', () => {
 it('renders a list item with its title contents, beginning of text body, and date modified/created depending orderBy', () => {
   const orderBys = ["created", "modified"];

   orderBys.forEach(function (orderBy) {
     const item = notes.get(0);
     let wasSelected;
     let onSelect = function (id) {
      wasSelected = id;
     };
     let selected;
     let isSelected = function (item) {
       selected = item;
     };
     const component = renderIntoDocument(
       <NotesListItem key={item.get('id')}
                      id={item.get('id')}
                      title={item.get('title')}
                      text={item.get('text')}
                      timestamp={item.get('timestamp')}
                      orderBy={orderBy}
                      onSelect={onSelect}
                      selected={isSelected(item)} />
     );
     const items = scryRenderedDOMComponentsWithTag(component, 'td');
     expect(items.length).to.equal(3);
     expect(items[0].textContent).to.contain('react');
     expect(items[0].textContent).to.contain(item.get('text'));
     expect(items[1].textContent).to.contain(item.get('timestamp').get(orderBy));
   });
 });
 it('check that a list item that is selected by select prop gets selected class', () => {
   const item = notes.get(0);
   let wasSelected;
   let onSelect = function (id) {
    wasSelected = id;
   };
   let selected;
   let isSelected = function (item) {
     selected = item;
   };
   const component = renderIntoDocument(
     <NotesListItem key={item.get('id')}
                    id={item.get('id')}
                    title={item.get('title')}
                    text={item.get('text')}
                    timestamp={item.get('timestamp')}
                    orderBy={'modified'}
                    onSelect={onSelect}
                    selected={true}
                    selected={isSelected(item)} />
   );
   const component2 = renderIntoDocument(
     <NotesListItem key={item.get('id')}
                    id={item.get('id')}
                    title={item.get('title')}
                    text={item.get('text')}
                    timestamp={item.get('timestamp')}
                    orderBy={'modified'}
                    onSelect={onSelect}
                    selected={false}
                    selected={isSelected(item)} />
   );
   const items = scryRenderedDOMComponentsWithTag(component, 'tr');
   const items2 = scryRenderedDOMComponentsWithTag(component2, 'tr');

   expect(items[0].classList.contains("selected"));
   expect(items2[0].classList.contains("selected")).to.equal(false);
 });
});
