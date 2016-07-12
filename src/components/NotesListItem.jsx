import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class NotesListItem extends React.Component {
  constructor(props) {
    super(props);
    //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  onClickCallback(e) {
    this.props.rowClicked(this.props.title);
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
  render() {
    return (
      <tr className={"notes-list-row" + this.oddOrEvenRow()}
          onClick={this.onClickCallback.bind(this)}
          ref={(c) => this._row = c}>
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
