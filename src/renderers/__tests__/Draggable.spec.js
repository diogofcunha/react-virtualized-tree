import React from 'react';
import { shallow } from 'enzyme';

import Draggable from '../Draggable';
import { UPDATE_TYPE } from '../../contants';

describe('renderers Draggable', () => {
  const getFakeEvent = () => ({ preventDefault: jest.fn(), stopPropagation: jest.fn() });

  const setup = (extraProps = {}, extraContext = {}, state) => {
    const baseProps = {
      onChange: jest.fn(),
      node: {
        id: 1,
        name: 'Node 1',
        state: {},
        deepness: 0,
        children: [{}],
        parents: [ 2, 3 ] 
      }
    }

    const baseContext = {
      handleDrag: jest.fn(),
      handleDrop: jest.fn()
    };

    const context = { ...baseContext, ...extraContext };

    const props = { ...baseProps, ...extraProps };
    const wrapper = shallow(<Draggable {...props} />, { context })

    if (state) {
      wrapper.setState(state)
    }

    return {
      props,
      wrapper,
      context,
      containerWrapper: wrapper.first(),
      draggableElementWrapper: wrapper.findWhere(p => p.props().draggable)
    };
  };

  it('should throw an error when context is not supplied', () => {
    const componentRender = () => setup({}, { handleDrag: undefined, handleDrop: undefined });
    
    expect(componentRender).toThrowErrorMatchingSnapshot();
  });

  describe('container', () => {
    describe('styling', () => {
      it('when not dragging over, should not have droping class', () => {
        const { containerWrapper } = setup();

        expect(containerWrapper.hasClass('dropable')).toBe(true);
        expect(containerWrapper.hasClass('droping')).toBe(false);
      });

      it('when dragging over, should have droping class', () => {
        const { containerWrapper, wrapper } = setup({}, {}, { draggingOver: true });

        expect(containerWrapper.hasClass('dropable')).toBe(true);
        expect(containerWrapper.hasClass('droping')).toBe(true);
      });
    });

    it('drag over should set draggingOver state to true and prevent default', () => {
      const { wrapper, containerWrapper } = setup();
      const event = getFakeEvent();

      containerWrapper.simulate('dragOver', event);

      expect(wrapper.state().draggingOver).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('drag leave should set draggingOver state to false', () => {
      const { wrapper, containerWrapper } = setup();

      containerWrapper.simulate('dragLeave');

      expect(wrapper.state().draggingOver).toBe(false);
    });

    it('drop should call injected handleDrop with the expected params and stop propagation', () => {
      const { containerWrapper, context, props } = setup();
      const event = getFakeEvent();

      containerWrapper.simulate('drop', event);

      expect(context.handleDrop).toHaveBeenCalledWith(props.node, UPDATE_TYPE.MOVE_AS_SIBLING);
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('draggable element', () => {
    it('dragOver should prevent default and stop propagation', () => {
      const { draggableElementWrapper } = setup();
      const event = getFakeEvent();

      draggableElementWrapper.simulate('dragOver', event);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('drag should call injected handleDrag with the expected params', () => {
      const { draggableElementWrapper, context, props } = setup();

      draggableElementWrapper.simulate('drag');

      expect(context.handleDrag).toHaveBeenCalledWith(props.node);
    });

    it('drop should call injected handleDrop with the expected params and stop propagation', () => {
      const { draggableElementWrapper, context, props } = setup();
      const event = getFakeEvent();

      draggableElementWrapper.simulate('drop', event);

      expect(context.handleDrop).toHaveBeenCalledWith(props.node, UPDATE_TYPE.MOVE_AS_CHILDREN);
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });
});