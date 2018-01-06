import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import 'material-icons/css/material-icons.css';

export default class Tree extends React.Component {
  rowRenderer =  (nodes) => ({ key, index, style}) => {
    const { children: NodeRenderer } = this.props;
    const node = nodes[index];
    return (
      <div
        key={key}
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
            rowHeight={20}
            rowRenderer={this.rowRenderer(nodes)}
            width={width}
        />
        )}
      </AutoSizer>
    );
  }
}
