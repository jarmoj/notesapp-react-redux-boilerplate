import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin'
import dateFormat from 'dateformat';

export default class NotesListItem extends React.Component {

  static get propTypes() {
    return {
      title: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      timestamp: React.PropTypes.object.isRequired,
      orderBy: React.PropTypes.string.isRequired,
      isSelected: React.PropTypes.bool.isRequired,
      rowClicked: React.PropTypes.func.isRequired,
      deleteClicked: React.PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.onClickRowCallback = this.onClickRowCallback.bind(this);
    this.onClickDeleteCallback = this.onClickDeleteCallback.bind(this);
  }

  onClickRowCallback() {
    this.props.rowClicked(this.props.title);
  }

  onClickDeleteCallback() {
    this.props.deleteClicked(this.props.title);
  }

  timestamp() {
    if (this.props.timestamp && this.props.orderBy) {
      const parts = this.props.orderBy.split(' ');
      const which = parts[0] === 'title' ? 'modified' : parts[0];
      return dateFormat(this.props.timestamp.get(which));
    }
    return '';
  }

  isSelected() {
    if (!this.props.isSelected) {
      return '';
    }

    if (this.props.isSelected) {
      return ' selected';
    }
    return '';
  }

  render() {
    return (
      <tr
        className={'notes-list-row' + this.isSelected()} // eslint-disable-line
        onClick={this.onClickRowCallback}
        ref={c => this._row = c} // eslint-disable-line
      >
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
            onClick={this.onClickDeleteCallback}
          >X</button>
        </td>
      </tr>
    );
  }
}
