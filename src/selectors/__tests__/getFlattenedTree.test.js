import {getFlattenedTree, getFlattenedTreePaths} from '../getFlattenedTree';
import {Nodes} from '../../../testData/sampleTree';

describe('getFlattenedTree', () => {
  it('should match snapshot', () => {
    expect(getFlattenedTree(Nodes)).toMatchSnapshot();
  });
});

test('getFlattenedTreePaths, should match snapshot', () => {
  expect(getFlattenedTreePaths(Nodes)).toMatchSnapshot();
});
