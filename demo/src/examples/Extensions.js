import React, { Component } from 'react';
import classNames from 'classnames';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import { Nodes } from '../../../testData/sampleTree';
import { createEntry } from '../toolbelt';

const { Expandable } = Renderers;

const SELECT = 3;

const Selection = ({ node, children, onChange }) => {
  const { state: { selected } = {} } = node;
  const className = classNames({
    'mi mi-check-box': selected,
    'mi mi-check-box-outline-blank': !selected
  });
  
  return (
    <span>
      <i
        id={node.id}
        className={className}
        onClick={() => onChange({
          node: {
            ...node,
            state: {
              ...(node.state || {}),
              selected: !selected
            }
          },
          type: SELECT 
          }
        )}>
      </i>
      { children }
    </span>);
};

class Extensions extends Component {
  state = {
    nodes: Nodes
  }

  handleChange = (nodes) => {
    this.setState({ nodes });
  }

  selectNodes = (nodes, selected) => nodes.map(n => ({
    ...n,
    children: n.children ? this.selectNodes(n.children, selected) : [],
    state: {
      ...n.state,
      selected
    }
  }))

  nodeSelectionHandler = (nodes, updatedNode) => nodes.map(node => {
    if (node.id === updatedNode.id) {
      return { 
        ...updatedNode,
        children: node.children ? this.selectNodes(node.children, updatedNode.state.selected) : []
      };
    }

    if (node.children) {
      return { ...node, children: this.nodeSelectionHandler(node.children, updatedNode) };
    }

    return node;
  })

  render() {
    return (
      <Tree
        nodes={this.state.nodes}
        onChange={this.handleChange}
        extensions={{
          updateTypeHandlers: {
            [SELECT]: this.nodeSelectionHandler
          }
        }}
      >
        {
          ({ node, ...rest }) =>
            <Expandable node={node} {...rest} >
              <Selection node={node} {...rest} >
                { node.name }
              </Selection>
            </Expandable>
        }
      </Tree>
    );
  }
}

export default createEntry(
  'extensions',
  'Extensions',
  'Extending behaviour',
  (<div>
    <p>A good example of a possible extension is creating a new handler to select nodes that automatically selects all the children nodes.</p>
    
    <p>By injecting <code>extensions</code> prop with an update type handler for node selection that can be achieved.</p>
  </div>),
  Extensions
);
