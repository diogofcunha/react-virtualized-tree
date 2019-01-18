import React from 'react';
import PropTypes from 'prop-types';
import {AutoSizer, List, CellMeasurerCache, CellMeasurer} from 'react-virtualized';

import {FlattenedNode} from './shapes/nodeShapes';

export default class Tree extends React.Component {
  _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 20,
  });

  rowRenderer = ({node, key, measure, style, NodeRenderer}) => {
    const {nodeMarginLeft} = this.props;

    return (
      <NodeRenderer
        key={key}
        style={{
          ...style,
          marginLeft: node.deepness * nodeMarginLeft,
          userSelect: 'none',
          cursor: 'pointer',
        }}
        node={node}
        onChange={this.props.onChange}
        measure={measure}
      />
    );
  };

  measureRowRenderer = nodes => ({key, index, style, parent}) => {
    const {NodeRenderer} = this.props;
    const node = nodes[index];

    return (
      <CellMeasurer cache={this._cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
        {m => this.rowRenderer({...m, node, key, style, NodeRenderer})}
      </CellMeasurer>
    );
  };

  render() {
    const {nodes, width, scrollToIndex} = this.props;

    return (
      <AutoSizer disableWidth={Boolean(width)}>
        {({height, width: autoWidth}) => (
          <List
            deferredMeasurementCache={this._cache}
            ref={r => (this._list = r)}
            height={height}
            rowCount={nodes.length}
            rowHeight={this._cache.rowHeight}
            rowRenderer={this.measureRowRenderer(nodes)}
            width={width || autoWidth}
            scrollToIndex={scrollToIndex}
          />
        )}
      </AutoSizer>
    );
  }
}

Tree.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape(FlattenedNode)).isRequired,
  NodeRenderer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  nodeMarginLeft: PropTypes.number,
  width: PropTypes.number,
};
