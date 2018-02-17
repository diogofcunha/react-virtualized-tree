import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Renderer } from '../shapes/rendererShapes';
import { UPDATE_TYPE } from '../contants';

class Draggable extends React.PureComponent {
  static propTypes = {
    ...Renderer
  }

  state = {
    draggingOver: false,
    draggingOverElement: false,
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

  handleDragOverElement = (draggingOverElement) => {
    this.setState({ draggingOverElement });
  }

  handleDrop = dropType => e => {
    const { node } = this.props;
    
    this.context.handleDrop(node, dropType);
    e.stopPropagation();
  }

  render() {
    const containerClassName = classNames('dropable', { droping: this.state.draggingOver });
    const draggableElementClassName = classNames('draggable', { dragOverElement: this.state.draggingOverElement });
  
    return (
      <div style={{ height: 21 }}
        className={containerClassName}
        onDragOver={e => {
          e.preventDefault();
          this.handleContainerDragOver(true)
        }}
        onDragLeave={e => this.handleContainerDragOver(false)}
        onDrop={this.handleDrop(UPDATE_TYPE.MOVE_AS_SIBLING)}
      >
        <span
          style={{ height: 19 }}
          className={draggableElementClassName}
          draggable
          onDragOver={e => {
            this.handleDragOverElement(true);
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragLeave={e => this.handleDragOverElement(false)}
          onDrag={e => {
            e.dataTransfer.effectAllowed = 'move';
            this.context.handleDrag(this.props.node); 
          }}
          onDrop={this.handleDrop(UPDATE_TYPE.MOVE_AS_CHILDREN)}>
            { this.props.children }
        </span>
        <div>
        </div>
      </div>);
  }
}

export default Draggable;