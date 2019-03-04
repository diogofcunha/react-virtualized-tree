import React from 'react';
import PropTypes from 'prop-types';
import {AutoSizer, List, CellMeasurerCache, CellMeasurer} from 'react-virtualized';

import {FlattenedNode} from './shapes/nodeShapes';
import TreeState, {State} from './state/TreeState';

export default class Tree extends React.Component {
  _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 20,
  });

  getRowCount = () => {
    const {nodes} = this.props;

    return nodes instanceof State ? nodes.flattenedTree.length : nodes.length;
  };

  getNodeDeepness = (node, index) => {
    const {nodes} = this.props;

    if (nodes instanceof State) {
      TreeState.getNodeDeepness(nodes, index);
    }

    return nodes instanceof State ? TreeState.getNodeDeepness(nodes, index) : node.deepness;
  };

  getNode = index => {
    const {nodes} = this.props;

    return nodes instanceof State
      ? {...TreeState.getNodeAt(nodes, index), deepness: this.getNodeDeepness({}, index)}
      : nodes[index];
  };

  rowRenderer = ({node, key, measure, style, NodeRenderer, index}) => {
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
        index={index}
      />
    );
  };

  measureRowRenderer = nodes => ({key, index, style, parent}) => {
    const {NodeRenderer} = this.props;
    const node = this.getNode(index);

    return (
      <CellMeasurer cache={this._cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
        {m => this.rowRenderer({...m, index, node, key, style, NodeRenderer})}
      </CellMeasurer>
    );
  };

  render() {
    const {nodes, width, scrollToIndex, scrollToAlignment} = this.props;

    return (
      <AutoSizer disableWidth={Boolean(width)}>
        {({height, width: autoWidth}) => (
          <List
            deferredMeasurementCache={this._cache}
            ref={r => (this._list = r)}
            height={height}
            rowCount={this.getRowCount()}
            rowHeight={this._cache.rowHeight}
            rowRenderer={this.measureRowRenderer(nodes)}
            width={width || autoWidth}
            scrollToIndex={scrollToIndex}
            scrollToAlignment={scrollToAlignment}
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
  scrollToIndex: PropTypes.number,
  scrollToAlignment: PropTypes.string,
};
