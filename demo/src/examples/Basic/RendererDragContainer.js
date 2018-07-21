import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableRenderer from './DraggableRenderer';

const style = {
  width: 400,
};

@DragDropContext(HTML5Backend)
export default class RendererDragContainer extends Component {
  render() {
    return (
      <div style={style}>
        {this.props.selectedRenderers.map((card, i) => (
          <DraggableRenderer
            key={card.name}
            index={i}
            id={i}
            renderer={card}
            moveRenderer={this.props.moveRenderer}
            handleRendererDeselection={this.props.handleRendererDeselection}
          />
        ))}
      </div>
    );
  }
}
