import TreeState from '../TreeState';
import {Nodes} from '../../../testData/sampleTree';

describe('TreeState', () => {
  describe('createFromTree', () => {
    test('should fail when falsy value is supplied', () => {
      expect(() => TreeState.createFromTree()).toThrowError('A falsy tree was supplied in tree creation');
      expect(() => TreeState.createFromTree('')).toThrowError('A falsy tree was supplied in tree creation');
      expect(() => TreeState.createFromTree(0)).toThrowError('A falsy tree was supplied in tree creation');
      expect(() => TreeState.createFromTree(false)).toThrowError('A falsy tree was supplied in tree creation');
    });

    test('should fail when an invalid value is supplied', () => {
      expect(() => TreeState.createFromTree({})).toThrowError('An invalid tree was supplied in creation');
      expect(() => TreeState.createFromTree('tree')).toThrowError('An invalid tree was supplied in creation');
      expect(() => TreeState.createFromTree(1234)).toThrowError('An invalid tree was supplied in creation');
      expect(() => TreeState.createFromTree(true)).toThrowError('An invalid tree was supplied in creation');
    });

    test('should create state when a valid tree is supplied', () => {
      const {tree, flattenedTree} = TreeState.createFromTree(Nodes);

      expect(tree).toEqual(Nodes);
      expect(flattenedTree).toMatchSnapshot();
    });
  });

  describe('getNodeAt', () => {
    test('should get a for an existing rowId', () => {
      expect(TreeState.getNodeAt(TreeState.createFromTree(Nodes), 0)).toBe(Nodes[0]);
      expect(TreeState.getNodeAt(TreeState.createFromTree(Nodes), 1)).toMatchSnapshot('2nd row');
      expect(TreeState.getNodeAt(TreeState.createFromTree(Nodes), 2)).toMatchSnapshot('3rd row');
      expect(TreeState.getNodeAt(TreeState.createFromTree(Nodes), 6)).toMatchSnapshot('7th row');
    });

    test('should fail with a custom error when supplied rowId does not exist', () => {
      expect(() => TreeState.getNodeAt(TreeState.createFromTree(Nodes), 25)).toThrowErrorMatchingSnapshot();
    });

    test('should fail for when invalid state is supplied', () => {
      expect(() => TreeState.getNodeAt('state', 0)).toThrowError('Expected a State instance but got string');
      expect(() => TreeState.getNodeAt(1225, 0)).toThrowError('Expected a State instance but got number');
      expect(() => TreeState.getNodeAt([], 0)).toThrowError('Expected a State instance but got object');
      expect(() => TreeState.getNodeAt({}, 0)).toThrowError('Expected a State instance but got object');
      expect(() => TreeState.getNodeAt(true, 0)).toThrowError('Expected a State instance but got boolean');
      expect(() => TreeState.getNodeAt(() => {}, 0)).toThrowError('Expected a State instance but got function');
    });
  });

  describe('getTree', () => {
    test('should get a tree', () => {
      expect(TreeState.getTree(TreeState.createFromTree(Nodes))).toEqual(Nodes);
    });

    test('should fail for when invalid state is supplied', () => {
      expect(() => TreeState.getTree('state')).toThrowError('Expected a State instance but got string');
      expect(() => TreeState.getTree(1225)).toThrowError('Expected a State instance but got number');
      expect(() => TreeState.getTree([])).toThrowError('Expected a State instance but got object');
      expect(() => TreeState.getTree({})).toThrowError('Expected a State instance but got object');
      expect(() => TreeState.getTree(true)).toThrowError('Expected a State instance but got boolean');
      expect(() => TreeState.getTree(() => {})).toThrowError('Expected a State instance but got function');
    });
  });
});
