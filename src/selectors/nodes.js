import {createSelector} from 'reselect';
import omit from 'lodash.omit';

import {UPDATE_TYPE} from '../contants';

export const getNodeRenderOptions = createSelector(
  node => (node.state || {}).expanded,
  node => (node.state || {}).favorite,
  node => (node.state || {}).deletable,
  node => node.children,
  (expanded, favorite, deletable, children = []) => ({
    hasChildren: !!children.length,
    isExpanded: !!expanded,
    isFavorite: !!favorite,
    isDeletable: !!deletable,
  }),
);

const FLATTEN_TREE_PROPERTIES = ['deepness', 'parents'];

const NODE_OPERATION_TYPES = {
  CHANGE_NODE: 'CHANGE_NODE',
  DELETE_NODE: 'DELETE_NODE',
};

const NODE_CHANGE_OPERATIONS = {
  CHANGE_NODE: (nodes, updatedNode) =>
    nodes.map(n => (n.id === updatedNode.id ? omit(updatedNode, FLATTEN_TREE_PROPERTIES) : n)),
  DELETE_NODE: (nodes, updatedNode) => nodes.filter(n => n.id !== updatedNode.id),
};

export const replaceNodeFromTree = (nodes, updatedNode, operation = NODE_OPERATION_TYPES.CHANGE_NODE) => {
  if (!NODE_CHANGE_OPERATIONS[operation]) {
    return nodes;
  }

  const {parents} = updatedNode;

  if (!parents.length) {
    return NODE_CHANGE_OPERATIONS[operation](nodes, updatedNode);
  }

  const parentIndex = nodes.findIndex(n => n.id === parents[0]);
  const preSiblings = nodes.slice(0, parentIndex);
  const postSiblings = nodes.slice(parentIndex + 1);

  return [
    ...preSiblings,
    {
      ...nodes[parentIndex],
      ...(nodes[parentIndex].children
        ? {
            children: replaceNodeFromTree(
              nodes[parentIndex].children,
              {...updatedNode, parents: parents.slice(1)},
              operation,
            ),
          }
        : {}),
    },
    ...postSiblings,
  ];
};

export const deleteNodeFromTree = (nodes, deletedNode) => {
  return replaceNodeFromTree(nodes, deletedNode, NODE_OPERATION_TYPES.DELETE_NODE);
};

export const updateNode = (originalNode, newState) => ({
  node: {
    ...originalNode,
    state: {
      ...originalNode.state,
      ...newState,
    },
  },
  type: UPDATE_TYPE.UPDATE,
});

export const deleteNode = node => ({
  node,
  type: UPDATE_TYPE.DELETE,
});

export const addNode = node => ({
  node,
  type: UPDATE_TYPE.ADD,
});
