import React from 'react';
import PropTypes from 'prop-types';
import {AutoSizer, List, CellMeasurerCache, CellMeasurer} from 'react-virtualized';

import {FlattenedNode} from './shapes/nodeShapes';
import TreeState, {State} from './state/TreeState';

export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topStickyHeader: null,
    };
    this._listRef = React.createRef();
  }

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

  isGroupHeader = node => {
    return node.children && node.children.length > 0 && node.deepness === 0;
  };

  componentDidMount() {
    if (this._listRef.current) {
      const list = this._listRef.current;
      const grid = list && list.Grid;
      if (grid) {
        this.handleScroll({
          scrollTop: grid.state.scrollTop,
        });
      }
    }
  }

  getAllHeaders = () => {
    const rowCount = this.getRowCount();
    const headers = [];
    let cumulativeHeight = 0;

    for (let i = 0; i < rowCount; i++) {
      const node = this.getNode(i);

      if (this.isGroupHeader(node)) {
        headers.push({
          node,
          index: i,
          top: cumulativeHeight,
        });
      }

      cumulativeHeight += this._cache.rowHeight({index: i});
    }

    return headers;
  };

  handleScroll = ({scrollTop}) => {
    if (!this._listRef.current) return;

    const allHeaders = this.getAllHeaders();

    const topStickyHeader = allHeaders.filter(h => h.top <= scrollTop).pop() || null;

    const currentStickyId =
      this.state.topStickyHeader && this.state.topStickyHeader.node && this.state.topStickyHeader.node.id;
    const newStickyId = topStickyHeader && topStickyHeader.node && topStickyHeader.node.id;

    if (currentStickyId !== newStickyId) {
      this.setState({
        topStickyHeader,
      });
    }
  };

  rowRenderer = ({node, key, measure, style, NodeRenderer, index}) => {
    const {nodeMarginLeft} = this.props;
    const isHeader = this.isGroupHeader(node);
    const className = isHeader ? 'tree-group-header' : '';

    return (
      <NodeRenderer
        key={key}
        style={{
          ...style,
          marginLeft: node.deepness * nodeMarginLeft,
          userSelect: 'none',
          cursor: 'pointer',
        }}
        className={className}
        node={node}
        onChange={this.props.onChange}
        measure={measure}
        index={index}
        isGroupHeader={isHeader}
      />
    );
  };

  renderStickyHeader = () => {
    const {topStickyHeader} = this.state;
    if (!topStickyHeader) return null;

    const {NodeRenderer, nodeMarginLeft} = this.props;
    const index = topStickyHeader.index;
    const currentNode = this.getNode(index);

    return (
      <NodeRenderer
        key={`sticky-header-${currentNode.id}`}
        style={{
          marginLeft: currentNode.deepness * nodeMarginLeft,
          userSelect: 'none',
          cursor: 'pointer',
          width: '100%',
          background: '#fff',
          zIndex: 10,
        }}
        className="tree-group-header tree-sticky"
        node={currentNode}
        onChange={this.props.onChange}
        index={index}
        isGroupHeader={true}
        isSticky={true}
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

  componentDidUpdate(prevProps) {
    if (prevProps.nodes !== this.props.nodes) {
      this._cache.clearAll();
      if (this._listRef.current) {
        this._listRef.current.recomputeRowHeights();
      }

      this.forceUpdate();
    }
  }

  render() {
    const {nodes, width, scrollToIndex, scrollToAlignment} = this.props;
    const {topStickyHeader} = this.state;
    const stickyHeaderHeight = topStickyHeader ? this._cache.rowHeight({index: topStickyHeader.index}) : 0;

    return (
      <div className="tree-container" style={{position: 'relative', height: '100%'}}>
        {topStickyHeader && (
          <div
            className="tree-sticky-header-container"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              height: `${stickyHeaderHeight}px`,
            }}
          >
            {this.renderStickyHeader()}
          </div>
        )}

        <AutoSizer disableWidth={Boolean(width)}>
          {({height, width: autoWidth}) => (
            <List
              deferredMeasurementCache={this._cache}
              ref={this._listRef}
              height={height}
              rowCount={this.getRowCount()}
              rowHeight={this._cache.rowHeight}
              rowRenderer={this.measureRowRenderer(nodes)}
              width={width || autoWidth}
              scrollToIndex={scrollToIndex}
              scrollToAlignment={scrollToAlignment}
              onScroll={this.handleScroll}
              overscanRowCount={20}
            />
          )}
        </AutoSizer>
      </div>
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
