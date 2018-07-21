import {getFlattenedTree} from '../getFlattenedTree';
import {Nodes} from '../../../testData/sampleTree';

describe('getFlattenedTree', () => {
  it('should match snapshot', () => {
    expect(getFlattenedTree(Nodes)).toMatchSnapshot();
  });
});
