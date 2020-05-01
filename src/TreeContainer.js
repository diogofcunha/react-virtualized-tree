import React from 'react';
import PropTypes from 'prop-types';

import Tree from './Tree';
import {UPDATE_TYPE} from './contants';
import {getFlattenedTree} from './selectors/getFlattenedTree';
import {deleteNodeFromTree, replaceNodeFromTree, getRowIndexFromId} from './selectors/nodes';
import {Node} from './shapes/nodeShapes';
import {createSelector} from 'reselect';

const DEFAULT_UPDATE_TYPES = {
  [UPDATE_TYPE.DELETE]: deleteNodeFromTree,
  [UPDATE_TYPE.UPDATE]: replaceNodeFromTree,
};

const getExtensions = createSelector(
  e => e,
  (extensions = {}) => {
    const {updateTypeHandlers = {}} = extensions;

    return {
      updateTypeHandlers: {
        ...DEFAULT_UPDATE_TYPES,
        ...updateTypeHandlers,
      },
    };
  },
);

export default class TreeContainer extends React.Component {
  static contextTypes = {
    unfilteredNodes: PropTypes.arrayOf(PropTypes.shape(Node)),
  };

  get nodes() {
    return this.context.unfilteredNodes || this.props.nodes;
  }

  handleChange = ({node, type}) => {
    const updatedNodes = getExtensions(this.props.extensions).updateTypeHandlers[type](this.nodes, node);

    this.props.onChange(updatedNodes);
  };

  _onRowsRendered = ({startIndex, stopIndex}) => {
    this.startIndex = startIndex;
    this.stopIndex = stopIndex;
  };

  render() {
    const flattenedTree = getFlattenedTree(this.props.nodes);
    const rowIndex = this.props.scrollToIndex || getRowIndexFromId(flattenedTree, this.props.scrollToId);
    return (
      <Tree
        nodeMarginLeft={this.props.nodeMarginLeft}
        nodes={flattenedTree}
        onChange={this.handleChange}
        NodeRenderer={this.props.children}
        scrollToIndex={rowIndex}
        scrollToAlignment={this.props.scrollToAlignment}
        width={this.props.width}
        onRowsRendered={this._onRowsRendered}
      />
    );
  }
}

TreeContainer.propTypes = {
  extensions: PropTypes.shape({
    updateTypeHandlers: PropTypes.object,
  }),
  nodes: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
  onChange: PropTypes.func,
  children: PropTypes.func.isRequired,
  nodeMarginLeft: PropTypes.number,
  width: PropTypes.number,
  scrollToId: PropTypes.number,
  scrollToAlignment: PropTypes.string,
  scrollToIndex: PropTypes.number,
};

TreeContainer.defaultProps = {
  nodeMarginLeft: 30,
  scrollToIndex: null,
};
