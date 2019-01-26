import {getFlattenedTreePaths, doesChangeAffectFlattenedTree, isNodeExpanded} from '../selectors/getFlattenedTree';
import TreeState, {validateState, State} from './TreeState';
import {replaceNodeFromTree} from '../selectors/nodes';

/**
 * @callback setNode
 * @param {Node} node - current node value
 * @return {Node} The updated node
 */

/**
 * Set of Tree State Modifiers
 */
export default class TreeStateModifiers {
  /**
   * Given a state, finds a node at a certain row index.
   * @param {State} state - The current state
   * @param {number} index - The visible row index
   * @param {setNode} setNode - A function to update the node
   * @return {State} An internal state representation
   */
  static editNodeAt = (state, index, setNode) => {
    validateState(state);

    const node = TreeState.getNodeAt(state, index);
    const updatedNode = setNode(node);
    const flattenedTree = [...state.flattenedTree];
    const flattenedNodeMap = flattenedTree[index];
    const parents = flattenedNodeMap.slice(0, flattenedNodeMap.length - 1);

    if (doesChangeAffectFlattenedTree(node, updatedNode)) {
      const numberOfVisibleDescendants = TreeState.getNumberOfVisibleDescendants(state, index);

      if (isNodeExpanded(updatedNode)) {
        const updatedNodeSubTree = getFlattenedTreePaths([updatedNode], parents);

        flattenedTree.splice(index + 1, 0, ...updatedNodeSubTree.slice(1));
      } else {
        flattenedTree.splice(index + 1, numberOfVisibleDescendants);
      }
    }

    const tree = replaceNodeFromTree(state.tree, {...updatedNode, parents});

    return new State(tree, flattenedTree);
  };
}
