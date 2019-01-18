import React, {Component} from 'react';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import {Nodes} from '../../../testData/sampleTree';
import {createEntry} from '../toolbelt';

const {Expandable} = Renderers;

class ChangeRenderers extends Component {
  state = {
    nodes: Nodes,
  };

  handleChange = nodes => {
    this.setState({nodes});
  };

  render() {
    return (
      <Tree nodes={this.state.nodes} onChange={this.handleChange}>
        {({style, node, ...rest}) => (
          <div style={style}>
            <Expandable
              node={node}
              {...rest}
              iconsClassNameMap={{
                expanded: 'mi mi-folder-open',
                collapsed: 'mi mi-folder',
                lastChild: 'mi mi-insert-drive-file',
              }}
            >
              {node.name}
            </Expandable>
          </div>
        )}
      </Tree>
    );
  }
}

export default createEntry(
  'customize-renderers',
  'ChangeRenderers',
  'Customize default renderers',
  <div>
    <p>
      A good example of a possible customization of a default renderer is customizing the tree to display as a folder
      structure.
    </p>

    <p>
      By exposing <code>iconsClassNameMap</code> it is possible to pass in the styles applied to the Expandable
      rendererer, the available style options are:
    </p>
    {'{ '}
    <code>expanded: string; collapsed: string; lastChild: string;</code>
    {' }'}
  </div>,
  ChangeRenderers,
);
