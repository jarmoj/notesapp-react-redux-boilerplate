import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class NotesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return <input className="notes-search"
                  autoFocus={true}
                  type="text" />
  }
};
