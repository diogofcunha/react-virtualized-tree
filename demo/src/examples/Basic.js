import React, { Component } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import { Nodes } from '../../../testData/sampleTree';
import { createEntry } from '../toolbelt';

const { Deletable, Expandable, Favorite } = Renderers;

const NodeNameRenderer = ({ node: { name }, children }) => (
  <span>
    { name }
    { children }
  </span>
);

class BasicTree extends Component {
  state = {
    nodes: Nodes,
    nodeDisplay: [ Expandable, NodeNameRenderer, Deletable, Favorite ]
  }

  handleChange = (nodes) => {
    this.setState({ nodes });
  }

  renderNodeDisplay = (display, props, children = []) => React.createElement(
    display,
    props,
    children
  );

  createNodeRenderer = (nodeDisplay = this.state.nodeDisplay, props) => {
    const [ nextNode, ...remainingNodes ] = nodeDisplay;

    if (remainingNodes.length === 0) {
      return this.renderNodeDisplay(nextNode, props);
    }

    return this.renderNodeDisplay(nextNode, props, this.createNodeRenderer(remainingNodes, props))
  }

  getRenderedComponentTree = () => reactElementToJSXString(
      this.createNodeRenderer(this.state.nodeDisplay, { node: { name: 'X' } })
    ).split('>')
    .filter(c => c)
    .map((c, i) => {
      const { nodeDisplay: { length } } = this.state;
      const isClosingTag = i >= length;

      const marginLeft = !isClosingTag ? 10 * i : 10 * (length - 2 - Math.abs(length - i));

      return <div style={{ marginLeft }}>{ c }></div>;
    })

  render() {
    return (
      <div>
        { this.getRenderedComponentTree() }
        <div style={{ height: 700 }}>
          <Tree nodes={this.state.nodes} onChange={this.handleChange}>
            {
              p => this.createNodeRenderer(this.state.nodeDisplay, p)
            }
          </Tree>
        </div>
      </div>
    );
  }
}

export default createEntry(
  'basic-tree',
  'Basic',
  'Basic Tree',
  (
    <div>
      <p>A tree that enables favorite toogle, expansion and deletion, this example only makes use of the default renderers</p>
    </div>
  ),
  BasicTree
);
