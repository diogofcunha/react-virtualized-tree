import {filterNodes} from '../filtering';
import {Nodes} from '../../../testData/sampleTree';

describe('filtering selectors', () => {
  const pairNodes = n => n.id % 2 === 0;

  it('should filter nodes based on injected filter', () => {
    expect(filterNodes(pairNodes, Nodes).nodes).toMatchSnapshot();
  });

  it('should create mappings matching filters', () => {
    const pairNodes = n => n.id % 2 === 0;

    expect(filterNodes(pairNodes, Nodes).nodeParentMappings).toMatchSnapshot();
  });
});
