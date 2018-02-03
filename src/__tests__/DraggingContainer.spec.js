import React from 'react';
import { shallow } from 'enzyme';

import DraggingContainer from '../DraggingContainer';
import { Nodes } from '../../testData/sampleTree';
import DefaultGroupRenderer from '../filtering/DefaultGroupRenderer';
import { getFlattenedTree } from '../selectors/getFlattenedTree';
import { UPDATE_TYPE } from '../contants';

describe('DraggingContainer', () => {
  const getSampleNode = (i) => getFlattenedTree(Nodes)[i];

  const setup = (extraProps = {}) => {
    const props = { onChange: jest.fn() };

    const wrapper = shallow(
      <DraggingContainer {...props}>
        <span></span>
      </DraggingContainer>
    );

    return {
      wrapper,
      props,
      createdContext: wrapper.instance().getChildContext()
    }
  }

  describe('Context', () => {
    it('should add to state on created handleDrag', () => {
      const fromNode = getSampleNode(2);

      const { createdContext, wrapper } = setup();

      createdContext.handleDrag(fromNode);

      expect(wrapper.state().fromNode).toEqual(fromNode);
    });

    it('should clear the state and call onChange with the correct params on created handleDrop', () => {
      const fromNode = getSampleNode(2);

      const { createdContext, wrapper, props } = setup();

      wrapper.setState({ fromNode });
      
      const toNode = getSampleNode(5);
      createdContext.handleDrop(toNode);

      expect(wrapper.state().fromNode).toEqual({});

      expect(props.onChange).toHaveBeenCalledWith({
        node: [ fromNode, toNode ],
        type: UPDATE_TYPE.MOVE
      });
    });
  });
});
