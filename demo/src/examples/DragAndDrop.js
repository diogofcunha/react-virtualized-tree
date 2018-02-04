import React, { Component } from 'react';
import classNames from 'classnames';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import { Nodes } from '../../../testData/sampleTree';
import { createEntry } from '../toolbelt';

const { Expandable, Draggable } = Renderers;

const SELECT = 3;

class DragAndDrop extends Component {
  state = {
    nodes: Nodes
  }

  handleChange = (nodes) => {
    this.setState({ nodes });
  }

  render() {
    return (
      <Tree
        nodes={this.state.nodes}
        onChange={this.handleChange}
        draggable
      >
        {
          ({ node, ...rest }) =>
          <Draggable node={node}>
            <Expandable node={node} {...rest}> 
              { node.name }
            </Expandable>
          </Draggable>
        }
      </Tree>
    );
  }
}

export default createEntry(
  'drag-n-drop',
  'DragAndDrop',
  'Drag and Drop',
  (<div>
    <p>A good example of a possible extension is creating a new handler to select nodes that automatically selects all the children nodes.</p>
    
    <p>By injecting <code>extensions</code> prop with an update type handler for node selection that can be achieved.</p>
  </div>),
  DragAndDrop
);
