import {getFlattenedTreePaths} from '../selectors/getFlattenedTree';
import {getNodeFromPath} from '../selectors/nodes';

export class State {
  flattenedTree = null;
  tree = null;

  constructor(tree, flattenedTree) {
    this.tree = tree;
    this.flattenedTree = flattenedTree || getFlattenedTreePaths(tree);
  }
}

export const validateState = state => {
  if (!(state instanceof State)) {
    throw new Error(`Expected a State instance but got ${typeof state}`);
  }
};

/**
 * Immutable structure that represents the TreeState.
 */
export default class TreeState {
  /**
   * Given a state, finds a node at a certain row index.
   * @param {State} state - The current state
   * @param {number} index - The visible row index
   * @return {State} An internal state representation
   */
  static getNodeAt = (state, index) => {
    validateState(state);

    const rowPath = state.flattenedTree[index];

    if (!rowPath) {
      throw Error(
        `Tried to get node at row "${index}" but got nothing, the tree are ${state.flattenedTree.length} visible rows`,
      );
    }

    return getNodeFromPath(rowPath, state.tree);
  };

  /**
   * Given a state, finds a node deepness at a certain row index.
   * @param {State} state - The current state
   * @param {number} index - The visible row index
   * @return {number} The node deepness
   */
  static getNodeDeepness = (state, index) => {
    validateState(state);

    const rowPath = state.flattenedTree[index];

    if (!rowPath) {
      throw Error(
        `Tried to get node at row "${index}" but got nothing, the tree are ${state.flattenedTree.length} visible rows`,
      );
    }

    return rowPath.length - 1;
  };

  /**
   * Given a state and an index, finds the number of visible descendants
   * @param {State} state - The current state
   * @param {number} index - The visible row index
   * @return {number} The number of visible descendants
   */
  static getNumberOfVisibleDescendants = (state, index) => {
    const {id} = TreeState.getNodeAt(state, index);

    const {flattenedTree} = state;
    let i;

    for (i = index; i < flattenedTree.length; i++) {
      const path = flattenedTree[i];

      if (!path.some(p => p === id)) {
        break;
      }
    }

    return Math.max(i - 1 - index, 0);
  };

  /**
   * Given a state, gets the tree
   * @param {State} state - The current state
   * @return {Node[]} The tree
   */
  static getTree = state => {
    validateState(state);

    return state.tree;
  };

  /**
   * Creates an instance of state.
   * @param {Node[]} tree - The original tree
   * @return {State} An internal state representation
   */
  static createFromTree = tree => {
    if (!tree) {
      throw Error('A falsy tree was supplied in tree creation');
    }

    if (!Array.isArray(tree)) {
      throw Error('An invalid tree was supplied in creation');
    }

    return new State(tree);
  };
}
