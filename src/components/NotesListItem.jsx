import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class NotesListItem extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <tr className="notes-list-row">
        <td className="notes-list-item-title">
          title
          <span className="notes-list-item-text">
            {' '} - text
          </span>
        </td>
        <td className="notes-list-item-date">
          timestamp
        </td>
        <td className="notes-list-item-destroy">
          <button className="destroy">X</button>
        </td>
      </tr>
    )
  }
};
