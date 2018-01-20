import React from 'react';
import PropTypes from 'prop-types';

import Tree from './Tree';
import { UPDATE_TYPE } from './contants';
import { getFlattenedTree } from './selectors/getFlattenedTree';
import { deleteNodeFromTree, replaceNodeFromTree } from './selectors/nodes';
import { Node } from './shapes/nodeShapes';

export default class TreeContainer extends React.Component {
  updateTypeMap = {
    [UPDATE_TYPE.DELETE]: deleteNodeFromTree,
    [UPDATE_TYPE.UPDATE]: replaceNodeFromTree 
  }

  handleChange = ({ node, type }) => {    
    const updatedNodes = this.updateTypeMap[type](this.props.nodes, node);

    this.props.onChange(updatedNodes);
  }

  render() {
    return (
      <Tree nodes={getFlattenedTree(this.props.nodes)} onChange={this.handleChange}> 
        { this.props.children }
      </Tree>
    );
  }
};

TreeContainer.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
  onChange: PropTypes.func,
  children: PropTypes.func.isRequired
};
