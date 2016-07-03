import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class NotesListItem extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <tr className="notes-list-row">
        <td className="notes-list-item">
          {this.props.title}
        </td>
        <td className="notes-list-item">
          {this.props.text}
        </td>
        <td className="notes-list-item">
          {this.props.timestamp[this.props.orderBy]}
        </td>
        <td className="notes-list-item">
          <button className="destroy" />
        </td>
      </tr>
    )
  }
};
