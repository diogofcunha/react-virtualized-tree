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

const PICK_CHILDREN_FROM = {
  ORIGIN: 0,
  CURRENT: 1
}

const FLATTEN_TREE_PROPERTIES = [ 'deepness', 'parents' ];

export const replaceNodeFromTree = (nodes, updatedNode, pickChildrenFrom = PICK_CHILDREN_FROM.ORIGIN) => {
  return nodes.map(node => {
    const children = node.children ? replaceNodeFromTree(node.children, updatedNode, pickChildrenFrom) : node.children;

    if (node.id === updatedNode.id) {
      return {
        ...omit(updatedNode, FLATTEN_TREE_PROPERTIES),
        ...pickChildrenFrom === PICK_CHILDREN_FROM.ORIGIN && children ? { children } : {}
      };
    }

    return {
      ...node,
      ...children ? { children } : {}
    };
  });
}

const findNodeOnTree = (parents, parentNode, id) => {
  if (!parents.length) {
    return {
      node: parentNode.children.find(n => n.id === id),
      parent: parentNode
    };
  }

  const [ nextParent ] = parents;

  return findNodeOnTree(
    parents.slice(1),
    parentNode.children.find(n => n.id === nextParent),
    id
  );
}

const isNodeInTreeRoot = n => n.id === undefined;

export const deleteNodeFromTree = (nodes, deletedNode) => {
  const { parent } = findNodeOnTree(deletedNode.parents, { children: nodes }, deletedNode.id);
  const childIndex = parent.children.findIndex(c => c.id === deletedNode.id);

  if (isNodeInTreeRoot(parent)) {
    return [
      ...nodes.slice(0, childIndex),
      ...nodes.slice(childIndex + 1)
    ]
  }

  return replaceNodeFromTree(
    nodes,
    { 
      ...parent,
      children: [
        ...parent.children.slice(0, childIndex),
        ...parent.children.slice(childIndex + 1)
      ]
    },
    PICK_CHILDREN_FROM.CURRENT
  );
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
