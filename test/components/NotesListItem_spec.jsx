import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Map } from 'immutable';
import dateFormat from 'dateformat';
import NotesListItem from '../../src/components/NotesListItem';

const { renderIntoDocument,
        Simulate } = TestUtils;

const timestamp = new Map({
  created: '1970-10-12T11:33:00.000Z',
  modified: '1980-10-12T12:33:00.000Z',
});

describe('NotesListItem - Selection', () => {
  it('clicking row calls rowClicked() handler', () => {
    let wasCalled = '';
    const title = 'some title title';
    function rowClicked(atitle) {
      wasCalled = atitle;
    }
    const component = mount(
      <table>
        <tbody>
          <NotesListItem
            title={title}
            text=""
            rowClicked={rowClicked}
            timestamp={timestamp}
            orderBy=""
            isSelected={false}
            deleteClicked={() => null}
          />
        </tbody>
      </table>
    );

    const row = component.find('tr');
    row.simulate('click');

    expect(wasCalled).to.equal(title);
  });
});

describe('NotesListItem - Visual', () => {
  it('renders item with its title, text body, and date modified/created depending orderBy', () => {
    const title = 'some title title';
    const text = 'something for the text body';

    const setup = mount(
      <table>
        <tbody>
          <NotesListItem
            title={title}
            text={text}
            timestamp={timestamp}
            orderBy="modified"
            rowClicked={() => null}
            isSelected={false}
            deleteClicked={() => null}
          />
        </tbody>
      </table>
    );

    const componentModified = setup.find('NotesListItem');

    expect(componentModified.text()).to.contain(title);
    expect(componentModified.text()).to.contain(text);
    expect(componentModified.text()).to.contain(dateFormat(timestamp.get('modified')));

    const setup2 = mount(
      <table>
        <tbody>
          <NotesListItem
            title={title}
            text={text}
            timestamp={timestamp}
            orderBy="created"
            rowClicked={() => null}
            isSelected={false}
            deleteClicked={() => null}
          />
        </tbody>
      </table>
    );

    const componentCreated = setup2.find('NotesListItem');

    expect(componentCreated.text()).to.contain(title);
    expect(componentCreated.text()).to.contain(text);
    expect(componentCreated.text()).to.contain(dateFormat(timestamp.get('created')));
  });

  it('check that a list item that is selected by select prop gets selected class', () => {
    const setup = mount(
      <table>
        <tbody>
          <NotesListItem
            isSelected={false}
            title=""
            text=""
            timestamp={timestamp}
            orderBy="created"
            rowClicked={() => null}
            deleteClicked={() => null}
          />
        </tbody>
      </table>
    );

    const component = setup.find('tr');
    expect(component.hasClass('selected')).to.equal(false);

    const setup2 = mount(
      <table>
        <tbody>
          <NotesListItem
            isSelected
            title=""
            text=""
            timestamp={timestamp}
            orderBy="created"
            rowClicked={() => null}
            deleteClicked={() => null}
          />
        </tbody>
      </table>
    );

    const component2 = setup2.find('tr');
    expect(component2.hasClass('selected')).to.equal(true);
  });

  it('has a pretty date format for the timestamp', () => {
    const title = 'some title title';
    const text = 'something for the text body';

    const setup = mount(
      <table>
        <tbody>
          <NotesListItem
            title={title}
            text={text}
            timestamp={timestamp}
            orderBy="modified"
            rowClicked={() => null}
            isSelected={false}
            deleteClicked={() => null}
          />
        </tbody>
      </table>
    );

    const component = setup.find('NotesListItem');

    expect(component.text()).to.contain(title);
    expect(component.text()).to.contain(text);
    expect(component.text()).to.contain(dateFormat(timestamp.get('modified')));

    const setup2 = mount(
      <table>
        <tbody>
          <NotesListItem
            title={title}
            text={text}
            timestamp={timestamp}
            orderBy="created"
            rowClicked={() => null}
            isSelected={false}
            deleteClicked={() => null}
          />
        </tbody>
      </table>
    );

    const component2 = setup2.find('NotesListItem');

    expect(component2.text()).to.contain(title);
    expect(component2.text()).to.contain(text);
    expect(component2.text()).to.contain(dateFormat(timestamp.get('created')));
  });

  it('TODO: test timestamps are compared properly', () => {
    
    expect(false).to.equal(true);
  });
});
