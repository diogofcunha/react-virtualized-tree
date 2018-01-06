import React from 'react';
import { shallow } from 'enzyme';

import Tree from '../Tree';
import { Nodes } from '../../testData/sampleTree';
import { getFlattenedTree } from '../selectors/getFlattenedTree';

describe('Tree', () => {
  it('should render a Tree with children and the correct props', () => {
    const nodes = getFlattenedTree(Nodes);

    const wrapper = shallow(
      <Tree nodes={nodes}>
        Hello!
      </Tree>
    );

    expect(wrapper.render()).toMatchSnapshot();
  });
});
