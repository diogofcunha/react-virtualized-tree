import React, { Component } from 'react';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import { Nodes } from '../../../testData/sampleTree';
import { createEntry } from '../toolbelt';

const { Deletable, Expandable, Favorite } = Renderers;

class BasicTree extends Component {
  state = {
    nodes: Nodes
  }

  handleChange = (nodes) => {
    this.setState({ nodes });
  }

  render() {
    return (
      <Tree list={this.state.nodes} onChange={this.handleChange}>
        {
          ({ node, ...rest }) =>
            <Expandable node={node} {...rest}>
              { node.name }
              <Deletable node={node} {...rest}>
                <Favorite node={node} {...rest}/>
              </Deletable>
            </Expandable>
        }
      </Tree>
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
