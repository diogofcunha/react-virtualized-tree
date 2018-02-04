import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Renderer } from '../shapes/rendererShapes';

const DROP_TYPE = {
  REORDER: 'REORDER',
  MOVE: 'MOVE'
}

class Draggable extends React.PureComponent {
  static propTypes = {
    ...Renderer
  }

  state = {
    draggingOver: false
  }

  static contextTypes = {
    handleDrag: PropTypes.func.isRequired,
    handleDrop: PropTypes.func.isRequired,
    fromNode: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    if (!context.handleDrag || !context.handleDrop) {
      throw new Error('You are trying to use Draggable renderer without the container');
    }
  }

  handleContainerDragOver = (draggingOver) => {
    this.setState({ draggingOver });
  }

  handleDrop = dropType => e => {
    this.context.handleDrop(this.props.node);
    e.stopPropagation();
  }

  render() {
    const containerClassName = classNames('dropable', { droping: this.state.draggingOver });

    return (
      <div
        className={containerClassName}
        onDragOver={e => {
          e.preventDefault();
          this.handleContainerDragOver(true)
        }}
        onDragLeave={e => this.handleContainerDragOver(false)}
      >
        <span 
          draggable
          onDragOver={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrag={() => { this.context.handleDrag(this.props.node); } }
          onDrop={this.handleDrop(DROP_TYPE.MOVE)}>
            { this.props.children }
        </span>
        <div>
        </div>
      </div>);
  }
}

export default Draggable;