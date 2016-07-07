import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class NotesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  isSelected() {
    return this.props.selected ? " selected" : "";
  }
  render() {
    return (
      <tr
        className={"notes-list-row" + this.isSelected()}
        onClick={() => this.props.onSelect(this.props.id)}>
        <td className="notes-list-item-title">
          {this.props.title}
          <span className="notes-list-item-text">
            {' '} - {this.props.text}
          </span>
        </td>
        <td className="notes-list-item-date">
          {this.props.timestamp[this.props.orderBy]}
        </td>
        <td className="notes-list-item-destroy">
          <button className="destroy">X</button>
        </td>
      </tr>
    )
  }
};
