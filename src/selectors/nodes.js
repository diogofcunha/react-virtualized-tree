import { createSelector } from 'reselect';
import { omit } from 'lodash';

import { UPDATE_TYPE, COLLECTION_MATCH } from '../contants';

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
  DELETE_NODE: 'DELETE_NODE'
}

const NODE_CHANGE_OPERATIONS = {
  CHANGE_NODE: (nodes, updatedNode) => nodes.map(n => n.id === updatedNode.id ? omit(updatedNode, FLATTEN_TREE_PROPERTIES) : n),
  DELETE_NODE: (nodes, updatedNode) => nodes.filter(n => n.id !== updatedNode.id) 
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
      ...nodes[parentIndex].children ? 
        { children: replaceNodeFromTree(
            nodes[parentIndex].children,
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

const getStateKeyValue = (stateKeyValue, collectionKeyValue = 'undef') => {
  const decisionMap = {
    undef: stateKeyValue ? COLLECTION_MATCH.All : COLLECTION_MATCH.None,
    [COLLECTION_MATCH.Some]: COLLECTION_MATCH.Some,
    [COLLECTION_MATCH.All]: stateKeyValue ? COLLECTION_MATCH.All : COLLECTION_MATCH.Some,
    [COLLECTION_MATCH.None]: stateKeyValue ? COLLECTION_MATCH.Some : COLLECTION_MATCH.None
  }

  return decisionMap[collectionKeyValue];
}

const mergeCollectionResults = (first, scnd, stateKeys) => {
  const decisionMap = {
    [COLLECTION_MATCH.Some]: v => COLLECTION_MATCH.Some,
    [COLLECTION_MATCH.All]: v => v === COLLECTION_MATCH.All ? COLLECTION_MATCH.All : COLLECTION_MATCH.Some,
    [COLLECTION_MATCH.None]: v => v === COLLECTION_MATCH.None ? COLLECTION_MATCH.None : COLLECTION_MATCH.Some
  }

  return stateKeys.reduce((merged, k) => ({
    ...merged,
    [k]: decisionMap[first[k]](scnd[k]) 
  }), {});
}


const mergeStateWithCollectionResults = (collectionResult, stateKeys, state = {}) => ({
  ...collectionResult,
  ...stateKeys.reduce((v, k) => ({
    ...v,
    [k]: getStateKeyValue(state[k], collectionResult[k]) 
  }), {})
});

export const getTreeState = (nodes, stateKeys) => nodes.reduce((acc, n) => {
  const childrenState = n.children ? getTreeState(n.children, stateKeys) : undefined;
  const mergedResults = mergeStateWithCollectionResults(acc, stateKeys, n.state);

  return childrenState && Object.keys(childrenState).length ? 
    mergeCollectionResults(mergedResults, childrenState, stateKeys) :
    mergedResults
}, {});
