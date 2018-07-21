import React from 'react';
import PropTypes from 'prop-types';

import Tree from './Tree';
import {UPDATE_TYPE} from './contants';
import {getFlattenedTree} from './selectors/getFlattenedTree';
import {deleteNodeFromTree, replaceNodeFromTree} from './selectors/nodes';
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

  render() {
    return (
      <Tree
        nodeMarginLeft={this.props.nodeMarginLeft}
        nodes={getFlattenedTree(this.props.nodes)}
        onChange={this.handleChange}
        NodeRenderer={this.props.children}
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
};

TreeContainer.defaultProps = {
  nodeMarginLeft: 30,
};
