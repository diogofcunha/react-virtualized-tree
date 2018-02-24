import deepFreeze from 'deep-freeze';

import * as nodeSelectors from '../nodes';
import { Nodes } from '../../../testData/sampleTree';
import { getFlattenedTree } from '../getFlattenedTree';
import { COLLECTION_MATCH } from '../../contants';

describe('selectors -> nodes ->', () => {
  const getSampleNode = (i = 0) => getFlattenedTree(Nodes)[i];

  describe('single node actions', () => {
    it('updateNode should update the supplied node state without mutations', () => {
      const originalNode = getSampleNode();

      deepFreeze(originalNode);

      expect(
        nodeSelectors.udpateNode(originalNode, { favorite: true, expanded: false } )
      ).toMatchSnapshot();
    });

    it('addNode should create the expected object', () => {
      expect(
        nodeSelectors.addNode(getSampleNode())
      ).toMatchSnapshot();
    });

    it('deleteNode should create the expected object', () => {
      expect(
        nodeSelectors.deleteNode(getSampleNode())
      ).toMatchSnapshot();
    });
  });

  describe('Tree actions', () => {
    describe('deleteNodeFromTree', () => {
      it('when root node is deleted, should delete that node and all children nodes', () => {
        deepFreeze(Nodes);

        expect(
          nodeSelectors.deleteNodeFromTree(Nodes, getSampleNode())
        ).toMatchSnapshot();
      });

      it('when a node is deleted, should delete that node and all children nodes', () => {
        deepFreeze(Nodes);

        expect(
          nodeSelectors.deleteNodeFromTree(Nodes, getSampleNode(1))
        ).toMatchSnapshot();
      });
    });

    it('replaceNodeFromTree should replace a node in the tree without mutations', () => {
      deepFreeze(Nodes);

      const updatedNode =  nodeSelectors.udpateNode(
        getSampleNode(),
        { favorite: true, expanded: false }
      );

      expect(
        nodeSelectors.replaceNodeFromTree(Nodes, updatedNode.node)
      ).toMatchSnapshot();
    });
  });

  describe('getNodeRenderOptions', () => {
    it('should extract state from nodes correctly when there are no children', () => {
      expect(
        nodeSelectors.getNodeRenderOptions({ state: { expanded: true, favorite: true } })
      ).toMatchSnapshot();
    });

    it('should extract state from nodes correctly when there are children', () => {
      expect(
        nodeSelectors.getNodeRenderOptions({ children: [{}], state: { deletable: true } })
      ).toMatchSnapshot();
    });

    it('should extract state from nodes correctly when there is no state', () => {
      expect(
        nodeSelectors.getNodeRenderOptions({ children: [{}] })
      ).toMatchSnapshot();
    });
  });

  describe('getTreeState', () => {
    const getTree = (stateToAssign, nodes) => nodes
      .map(t => ({ 
        ...t,
        children: t.children ? getTree(stateToAssign, t.children) : [],
        state: {
          ...t.state || {},
          ...stateToAssign
        }
      })
    );

    const getStateKeys = () => [ 'expanded', 'deletable', 'favorite' ];

    it('should return the correct result when all nodes are true for a state key', () => {
      const allExpandedTree = getTree({ expanded: true }, Nodes);
      
      expect(
        nodeSelectors.getTreeState(allExpandedTree, getStateKeys())
      ).toEqual({
        expanded: COLLECTION_MATCH.All,
        deletable: COLLECTION_MATCH.Some,
        favorite: COLLECTION_MATCH.Some
      });
    });

    it('should return the correct result when all nodes are false for a state key', () => {
      const undetableTree = getTree({ deletable: false }, Nodes);

      expect(
        nodeSelectors.getTreeState(undetableTree, getStateKeys())
      ).toEqual({
        expanded: COLLECTION_MATCH.Some,
        deletable: COLLECTION_MATCH.None,
        favorite: COLLECTION_MATCH.Some
      });
    });

    it('should return the correct result when all parent nodes are true for a state key, but some children are false', () => {
      const favoriteTree = getTree({ favorite: false }, Nodes);

      expect(
        nodeSelectors.getTreeState(
          favoriteTree.map(n => ({ ...n, state: { ...n.state, favorite: true } })),
          getStateKeys()
        )
      ).toEqual({
        expanded: COLLECTION_MATCH.Some,
        deletable: COLLECTION_MATCH.Some,
        favorite: COLLECTION_MATCH.Some
      });
    });
  });
});
