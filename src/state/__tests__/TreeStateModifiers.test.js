import deepFreeze from 'deep-freeze';
import {diff} from 'deep-diff';

import TreeStateModifiers from '../TreeStateModifiers';
import {Nodes} from '../../../testData/sampleTree';
import TreeState from '../TreeState';

describe('TreeStateModifiers', () => {
  const noop = () => {};

  describe('editNodeAt', () => {
    test('should fail when invalid state is supplied', () => {
      expect(() => TreeStateModifiers.editNodeAt('state', 0, noop)).toThrowError(
        'Expected a State instance but got string',
      );
      expect(() => TreeStateModifiers.editNodeAt(1225, 0, noop)).toThrowError(
        'Expected a State instance but got number',
      );
      expect(() => TreeStateModifiers.editNodeAt([], 0, noop)).toThrowError('Expected a State instance but got object');
      expect(() => TreeStateModifiers.editNodeAt({}, 0, noop)).toThrowError('Expected a State instance but got object');
      expect(() => TreeStateModifiers.editNodeAt(true, 0, noop)).toThrowError(
        'Expected a State instance but got boolean',
      );
      expect(() => TreeStateModifiers.editNodeAt(() => {}, 0, noop)).toThrowError(
        'Expected a State instance but got function',
      );
    });

    test('should fail with descriptive error when node at index does not exist', () => {
      expect(() =>
        TreeStateModifiers.editNodeAt(TreeState.createFromTree(Nodes), 20, noop),
      ).toThrowErrorMatchingSnapshot();
    });

    describe('flattened tree', () => {
      test('should collapse a node in a root node', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        const {flattenedTree} = TreeStateModifiers.editNodeAt(state, 0, n => ({
          ...n,
          state: {...n.state, expanded: false},
        }));

        expect(flattenedTree).toMatchSnapshot();
      });

      test('should collapse a node in a children node', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        const {flattenedTree} = TreeStateModifiers.editNodeAt(state, 1, n => ({
          ...n,
          state: {...n.state, expanded: false},
        }));

        expect(flattenedTree).toMatchSnapshot();
      });

      test('should expand a node in a root node', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        const {flattenedTree} = TreeStateModifiers.editNodeAt(state, 5, n => ({
          ...n,
          state: {...n.state, expanded: true},
        }));

        expect(flattenedTree).toMatchSnapshot();
      });

      test('should expand a node in a children node', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        const {flattenedTree} = TreeStateModifiers.editNodeAt(state, 2, n => ({
          ...n,
          state: {...n.state, expanded: true},
        }));

        expect(flattenedTree).toMatchSnapshot();
      });

      test('should not change for updates that do not change state', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        const {flattenedTree} = TreeStateModifiers.editNodeAt(state, 2, n => ({
          ...n,
          name: 'node',
        }));

        expect(flattenedTree).toEqual(state.flattenedTree);
      });

      test('should not change for updates that change state but not expansion', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        const {flattenedTree} = TreeStateModifiers.editNodeAt(state, 2, n => ({
          ...n,
          state: {...n.state, favorite: true},
        }));

        expect(flattenedTree).toEqual(state.flattenedTree);

        const {flattenedTree: flattenedTree2} = TreeStateModifiers.editNodeAt(state, 0, n => ({
          ...n,
          state: {...n.state, deletable: true},
        }));

        expect(flattenedTree2).toEqual(state.flattenedTree);

        const {flattenedTree: flattenedTree3} = TreeStateModifiers.editNodeAt(state, 0, n => ({
          ...n,
          state: {...n.state, randomKey: true},
        }));

        expect(flattenedTree3).toEqual(state.flattenedTree);
      });
    });

    describe('tree', () => {
      test('should update a node in the root and keep the rest intact', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        const updatedName = 'Edit node 1';

        // Change 'Leaf 1'
        const {tree} = TreeStateModifiers.editNodeAt(state, 0, n => ({
          ...n,
          name: updatedName,
        }));

        const changes = diff(state.tree, tree);

        expect(changes.length).toBe(1);
        expect(changes[0]).toMatchSnapshot();
      });

      test('should update a child node and keep the rest intact', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        const updatedName = 'Edited node';

        // Change 'Leaf 3'
        const {tree} = TreeStateModifiers.editNodeAt(state, 2, n => ({
          ...n,
          name: updatedName,
        }));

        const changes = diff(state.tree, tree);

        expect(changes.length).toBe(1);
        expect(changes[0]).toMatchSnapshot();
      });

      test('should update a node state in the root and keep the rest intact', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        // Expand 'Leaf 6'
        const {tree} = TreeStateModifiers.editNodeAt(state, 5, n => ({
          ...n,
          state: {expanded: true},
        }));

        const changes = diff(state.tree, tree);

        expect(changes).toMatchSnapshot();
      });

      test('should update a child node state and keep the rest intact', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        // Collapse 'Leaf 2'
        const {tree} = TreeStateModifiers.editNodeAt(state, 1, n => ({
          ...n,
          state: {...n.state, expanded: false},
        }));

        const changes = diff(state.tree, tree);

        expect(changes.length).toBe(1);
        expect(changes[0]).toMatchSnapshot();
      });

      test('should create state for a child node and keep the rest intact', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        // Favorite 'Leaf 5'
        const {tree} = TreeStateModifiers.editNodeAt(state, 4, n => ({
          ...n,
          state: {...n.state, expanded: true},
        }));

        const changes = diff(state.tree, tree);

        expect(changes.length).toBe(1);
        expect(changes[0]).toMatchSnapshot();
      });

      test('should delete state for a root node and keep the rest intact', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        // Clear state for 'Leaf 6'
        const {tree} = TreeStateModifiers.editNodeAt(state, 5, n => {
          return Object.keys(n)
            .filter(k => k !== 'state')
            .reduce((node, k) => ({...node, [k]: n[k]}), {});
        });

        const changes = diff(state.tree, tree);

        expect(changes.length).toBe(1);
        expect(changes[0]).toMatchSnapshot();
      });

      test('should delete state for a child node and keep the rest intact', () => {
        const state = TreeState.createFromTree(Nodes);

        deepFreeze(state);

        // Clear state for 'Leaf 3'
        const {tree} = TreeStateModifiers.editNodeAt(state, 2, n => {
          return Object.keys(n)
            .filter(k => k !== 'state')
            .reduce((node, k) => ({...node, [k]: n[k]}), {});
        });

        const changes = diff(state.tree, tree);

        expect(changes.length).toBe(1);
        expect(changes[0]).toMatchSnapshot();
      });
    });
  });
});
