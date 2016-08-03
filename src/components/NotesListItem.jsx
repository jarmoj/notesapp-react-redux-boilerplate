import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class NotesListItem extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  onClickRowCallback(e) {
    this.props.rowClicked(this.props.title);
  }
  onClickDeleteCallback(e) {
    this.props.deleteClicked(this.props.title);
  }
  oddOrEvenRow() {
    if (!('isOddRow' in this.props)) {
      return "";
    }

    if (this.props.isOddRow) {
      return " odd-row";
    }
    return " even-row";
  }
  timestamp() {
    if (this.props.timestamp && this.props.orderBy) {
      const parts = this.props.orderBy.split(" ");
      const which = parts[0] == 'title' ? 'modified' : parts[0];
      return this.props.timestamp.get(which);
    }
    return "";
  }
  isSelected() {
    if (!('selected' in this.props)) {
      return "";
    }

    if (this.props.selected) {
      return " selected";
    }
    return "";
  }
  render() {
    return (
      <tr className={"notes-list-row" + this.oddOrEvenRow() + this.isSelected()}
          onClick={this.onClickRowCallback.bind(this)}
          ref={(c) => this._row = c}>
        <td className="notes-list-item-title">
          {this.props.title}
          <span className="notes-list-item-text">
            {' '} - {this.props.text}
          </span>
        </td>
        <td className="notes-list-item-date">
          {this.timestamp()}
        </td>
        <td className="notes-list-item-destroy">
          <button
            className="destroy"
            onClick={this.onClickDeleteCallback.bind(this)}>X</button>
        </td>
      </tr>
    )
  }
};
