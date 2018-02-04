import React from 'react';
import PropTypes from 'prop-types';

import { Node } from './shapes/nodeShapes';
import { UPDATE_TYPE } from './contants';

export default class DraggingContainer extends React.Component {
  state = {
    fromNode: {}
  }

  handleDrag = fromNode => {
    this.setState({ fromNode });
  }

  handleDrop = toNode => {
    this.props.onChange({
      node: [ this.state.fromNode, toNode ],
      type: UPDATE_TYPE.MOVE
    });

    this.setState({ fromNode: {} });
  }

  getChildContext = () => ({
    handleDrag: this.handleDrag,
    handleDrop: this.handleDrop,
    fromNode: this.state.fromNode
  })

  static childContextTypes = {
    handleDrag: PropTypes.func,
    handleDrop: PropTypes.func,
    fromNode: PropTypes.object
  }

  render() {
    return (
      <div
        className={this.props.className}
        onDrop={() => this.handleDrop({ ...this.state.fromNode, parents: [] })}
        onDragOver={e => e.preventDefault()}
      > 
        { this.props.children }
      </div>
    )
  }
}

DraggingContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}