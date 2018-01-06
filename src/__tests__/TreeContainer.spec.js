import React from 'react';
import { shallow } from 'enzyme';

import TreeContainer from '../TreeContainer';
import Tree from '../Tree';
import { Nodes } from '../../testData/sampleTree';
import { getFlattenedTree } from '../selectors/getFlattenedTree';
import { UPDATE_TYPE } from '../contants';

describe('TreeContainer', () => {
  const setup = (children = null) => {
    const props = {
      list: Nodes,
      onChange: jest.fn()
    };

    const wrapper = shallow(
      <TreeContainer {...props}>
        { children }
      </TreeContainer>
    );

    return {
      wrapper,
      props,
      treeWrapper: wrapper.find(Tree)
    }
  };

  it('should render a Tree with children and the correct props', () => {
    const ExampleChild = () => <div>I am a child of the Summer!</div>;
    const { treeWrapper, wrapper } = setup(<ExampleChild/>);
    const { nodes } = treeWrapper.props();

    expect(nodes).toMatchSnapshot();

    expect(wrapper.find(ExampleChild).length).toBe(1);
  });

  describe('change handle', () => {
    const getSampleNode = () => getFlattenedTree(Nodes)[2]

    it('should call injected prop onChange with the correct params when a nome is deleted', () => {
      const { treeWrapper, props } = setup();

      treeWrapper.simulate('change', { node: getSampleNode(), type: UPDATE_TYPE.DELETE });

      expect(
        props.onChange.mock.calls[0]
      ).toMatchSnapshot();
    });

    it('should call injected prop onChange with the correct params when a nome is updated', () => {
      const { treeWrapper, props } = setup();

      treeWrapper.simulate('change', {
        node: { ...getSampleNode(), state: { favorite: false, deletable: false } },
        type: UPDATE_TYPE.UPDATE 
      });

      expect(
        props.onChange.mock.calls[0]
      ).toMatchSnapshot();
    });
  });
});
