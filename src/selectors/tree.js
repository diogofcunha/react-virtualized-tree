import { COLLECTION_MATCH } from '../constants';

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
