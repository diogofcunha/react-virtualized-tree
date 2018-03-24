import { getTreeState } from '../tree';
import { COLLECTION_MATCH } from '../../constants';
import { Nodes } from '../../../testData/sampleTree';

describe('tree selectors', () => {
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
        getTreeState(allExpandedTree, getStateKeys())
      ).toEqual({
        expanded: COLLECTION_MATCH.All,
        deletable: COLLECTION_MATCH.Some,
        favorite: COLLECTION_MATCH.Some
      });
    });
  
    it('should return the correct result when all nodes are false for a state key', () => {
      const undetableTree = getTree({ deletable: false }, Nodes);
  
      expect(
        getTreeState(undetableTree, getStateKeys())
      ).toEqual({
        expanded: COLLECTION_MATCH.Some,
        deletable: COLLECTION_MATCH.None,
        favorite: COLLECTION_MATCH.Some
      });
    });
  
    it('should return the correct result when all parent nodes are true for a state key, but some children are false', () => {
      const favoriteTree = getTree({ favorite: false }, Nodes);
  
      expect(
        getTreeState(
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
