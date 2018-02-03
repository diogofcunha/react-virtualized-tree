import deepFreeze from 'deep-freeze';

import * as nodeSelectors from '../nodes';
import { Nodes } from '../../../testData/sampleTree';
import { getFlattenedTree } from '../getFlattenedTree';

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

    describe('moveNodeFromTree', () => {
      it('should move a node from the root correctly without mutations', () => {
        deepFreeze(Nodes);

        const movedNodes = [
          getSampleNode(6),
          getSampleNode(0)
        ];

        expect(
          nodeSelectors.moveNodeFromTree(Nodes, movedNodes)
        ).toMatchSnapshot();
      });

      it('should move a node to a parentless node without mutations', () => {
        deepFreeze(Nodes);

        const movedNodes = [
          getSampleNode(2), // node 3
          getSampleNode(6) // node z
        ];

        expect(
          nodeSelectors.moveNodeFromTree(Nodes, movedNodes)
        ).toMatchSnapshot();
      });

      it('should move a node to with children without mutations', () => {
        deepFreeze(Nodes);

        const movedNodes = [
          getSampleNode(1), // node 2
          getSampleNode(5) // node 6
        ];

        expect(
          nodeSelectors.moveNodeFromTree(Nodes, movedNodes)
        ).toMatchSnapshot();
      });
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
});
