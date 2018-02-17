import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List } from 'react-virtualized';

import { FlattenedNode } from './shapes/nodeShapes';

export default class Tree extends React.Component {
  rowRenderer =  (nodes) => ({ key, index, style}) => {
    const { children: NodeRenderer } = this.props;
    const node = nodes[index];
    return (
      <div
        key={key}
        className="tree-node"
        style={{ ...style, marginLeft: node.deepness * 30}}
      >
        <NodeRenderer node={node} onChange={this.props.onChange}/>
      </div>
    )
  }

  render() {
    const { children, nodes } = this.props;

    return (
      <AutoSizer>
        {({ height, width }) => (
        <List
            height={height}
            rowCount={nodes.length}
            rowHeight={21}
            rowRenderer={this.rowRenderer(nodes)}
            width={width}
        />
        )}
      </AutoSizer>
    );
  }
}

Tree.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape(FlattenedNode)).isRequired,
  children: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
