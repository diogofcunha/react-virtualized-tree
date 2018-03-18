import React from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, List, CellMeasurerCache, CellMeasurer } from 'react-virtualized';

import { FlattenedNode } from './shapes/nodeShapes';

export default class Tree extends React.Component {
  _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 20,
  })

  rowRenderer = ({ node, key, measure, style, NodeRenderer }) => {
    const {nodeMarginLeft} = this.props;

    return (
      <div
        key={key}
        className="tree-node"
        style={{ ...style, marginLeft: node.deepness * nodeMarginLeft}}
      >
        <NodeRenderer node={node} onChange={this.props.onChange} measure={measure}/>
      </div>
    );
  }

  measureRowRenderer =  (nodes) => ({ key, index, style, parent }) => {
    const { children: NodeRenderer } = this.props;
    const node = nodes[index];

    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}>
        {
          m => this.rowRenderer({ ...m, node, key, style, NodeRenderer })
        }
      </CellMeasurer>
    )
  }

  render() {
    const { children, nodes } = this.props;

    return (
      <AutoSizer>
        {({ height, width }) => (
        <List
          deferredMeasurementCache={this._cache}
          ref={r => this._list = r}
          height={height}
          rowCount={nodes.length}
          rowHeight={this._cache.rowHeight}
          rowRenderer={this.measureRowRenderer(nodes)}
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
  onChange: PropTypes.func.isRequired,
  nodeMarginLeft: PropTypes.number,
};
