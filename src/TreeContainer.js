import React from 'react';

import Tree from './Tree';
import { UPDATE_TYPE } from './contants';
import { getFlattenedTree } from './selectors/getFlattenedTree';
import { deleteNodeFromTree, replaceNodeFromTree } from './selectors/nodes';

export default class TreeContainer extends React.Component {
  updateTypeMap = {
    [UPDATE_TYPE.DELETE]: deleteNodeFromTree,
    [UPDATE_TYPE.UPDATE]: replaceNodeFromTree 
  }

  handleChange = ({ node, type }) => {    
    const updatedNodes = this.updateTypeMap[type](this.props.list, node);

    this.props.onChange(updatedNodes);
  }

  render() {
    return (
      <Tree nodes={getFlattenedTree(this.props.list)} onChange={this.handleChange}> 
        { this.props.children }
      </Tree>
    );
  }
};