import React, { Component } from 'react';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import { Nodes } from '../../../testData/sampleTree';

const { Expandable } = Renderers;

export default class ChangeRenderers extends Component {
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
            <Expandable
              node={node}
              {...rest}
              iconsClassNameMap={{
                expanded: 'mi mi-folder-open',
                collapsed: 'mi mi-folder',
                lastChild: 'mi mi-insert-drive-file'
              }}
            >
              { node.name }
            </Expandable>
        }
      </Tree>
    );
  }
}
