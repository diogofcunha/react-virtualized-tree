import React, {Component} from 'react';
import FocusTrap from 'focus-trap-react';
import Tree from '../../../src/TreeContainer';
import {Nodes} from '../../../testData/sampleTree';
import {createEntry} from '../toolbelt';
import Renderers from '../../../src/renderers';

const {Expandable, Favorite} = Renderers;

class KeyboardNavigation extends Component {
  state = {
    nodes: Nodes,
    trapFocus: false,
  };

  handleChange = nodes => {
    this.setState({nodes});
  };

  nodeRenderer = ({style, node, ...rest}) => {
    return (
      <div style={style} data-nodeid={rest['data-nodeid']}>
        <Expandable node={node} {...rest}>
          <Favorite node={node} {...rest}>
            <span tabIndex={0}>{node.name}</span>
          </Favorite>
        </Expandable>
      </div>
    );
  };

  render() {
    return (
      <FocusTrap>
        <Tree nodes={this.state.nodes} onChange={this.handleChange}>
          {this.nodeRenderer}
        </Tree>
      </FocusTrap>
    );
  }
}

export default createEntry(
  'keyboard-nav',
  'KeyboardNavigation',
  'Keyboard navigation',
  <div>
    <p>A tree that supports keyboard navigation</p>
  </div>,
  KeyboardNavigation,
);
