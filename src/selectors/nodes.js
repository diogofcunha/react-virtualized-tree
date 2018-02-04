import { createSelector } from 'reselect';
import { omit } from 'lodash';

import { UPDATE_TYPE } from '../contants';

export const getNodeRenderOptions = createSelector(
  (node => (node.state || {}).expanded),
  (node => (node.state || {}).favorite),
  (node => (node.state || {}).deletable),
  (node => node.children), 
  (expanded, favorite, deletable, children = []) => ({
    hasChildren: !!children.length,
    isExpanded: !!expanded,
    isFavorite: !!favorite,
    isDeletable: !!deletable
  })
);

const FLATTEN_TREE_PROPERTIES = [ 'deepness', 'parents' ];

const NODE_OPERATION_TYPES = {
  CHANGE_NODE: 'CHANGE_NODE',
  DELETE_NODE: 'DELETE_NODE',
  ADD_NODE: 'ADD_NODE'
}

const NODE_CHANGE_OPERATIONS = {
  CHANGE_NODE: (nodes, updatedNode) => nodes.map(n => n.id === updatedNode.id ? omit(updatedNode, FLATTEN_TREE_PROPERTIES) : n),
  DELETE_NODE: (nodes, updatedNode) => nodes.filter(n => n.id !== updatedNode.id),
  ADD_NODE: (nodes, nodeToAdd) => [ ...nodes, omit(nodeToAdd, FLATTEN_TREE_PROPERTIES) ]
}

export const replaceNodeFromTree = (nodes, updatedNode, operation = NODE_OPERATION_TYPES.CHANGE_NODE) => {
  if (!NODE_CHANGE_OPERATIONS[operation]) {
    return nodes;
  }
  
  const { parents } = updatedNode;

  if (!parents.length) {
    return NODE_CHANGE_OPERATIONS[operation](nodes, updatedNode);
  }

  const parentIndex = nodes.findIndex(n => n.id === parents[0])

  const preSiblings = nodes.slice(0, parentIndex);
  const postSiblings = nodes.slice(parentIndex + 1);

  return [
    ...preSiblings,
    {
      ...nodes[parentIndex], 
      ...nodes[parentIndex].children || operation === NODE_OPERATION_TYPES.ADD_NODE ? 
        { children: replaceNodeFromTree(
            nodes[parentIndex].children || [],
            { ...updatedNode, parents: parents.slice(1) },
            operation
          )
        } : {}
    },
    ...postSiblings
  ]
}

export const deleteNodeFromTree = (nodes, deletedNode) => {
  return replaceNodeFromTree(
    nodes,
    deletedNode,
    NODE_OPERATION_TYPES.DELETE_NODE
  );
}

export const addNodeToTree = (nodes, nodeToAdd) => replaceNodeFromTree(
  nodes,
  nodeToAdd,
  NODE_OPERATION_TYPES.ADD_NODE
)

export const moveNodeFromTree = (nodes, [ fromNode, toNode ]) => {
  const treeWithoutMovedNode = deleteNodeFromTree(
    nodes,
    fromNode
  );

  const { id: targetId, parents: targetParents } = toNode;
  const parents = [ ...targetParents, ...targetId !== fromNode.id ? [targetId] : []];

  const nodeToAdd =  { ...fromNode, parents };

  return addNodeToTree(treeWithoutMovedNode, nodeToAdd);
}

export const udpateNode = (originalNode, newState) => ({
  node: {
    ...originalNode,
    state : {
      ...originalNode.state,
      ...newState
    }
  },
  type: UPDATE_TYPE.UPDATE
});

export const deleteNode = node => ({
  node,
  type: UPDATE_TYPE.DELETE
});

export const addNode = node => ({
  node,
  type: UPDATE_TYPE.ADD
});
