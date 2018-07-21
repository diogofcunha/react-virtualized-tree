import React from 'react';
import {shallow} from 'enzyme';

import Deletable from '../Deletable';
import {KEY_CODES} from '../../eventWrappers';
import {deleteNode} from '../../selectors/nodes';

describe('renderers Deletable', () => {
  const findDeleteIcon = wrapper => wrapper.find('i');

  const setup = (state = {deletable: true}, extraProps = {}) => {
    const baseProps = {
      onChange: jest.fn(),
      node: {
        id: 1,
        name: 'Node 1',
        state,
        deepness: 0,
        children: [{}],
      },
      iconsClassNameMap: {
        delete: 'delete',
      },
      measure: jest.fn(),
    };

    const props = {...baseProps, ...extraProps};
    const wrapper = shallow(<Deletable {...props} />);

    return {props, wrapper, deleteIconWrapper: findDeleteIcon(wrapper)};
  };

  describe('when it is deletable', () => {
    it('should render the delete icon with the supplied className or the default', () => {
      const {deleteIconWrapper, props} = setup();

      expect(deleteIconWrapper.hasClass(props.iconsClassNameMap.delete)).toBeTruthy();
    });

    it('clicking should call onChange with the correct params', () => {
      const {deleteIconWrapper, props} = setup();

      deleteIconWrapper.simulate('click');

      expect(props.onChange).toHaveBeenCalledWith(deleteNode(props.node));
    });

    it('pressing enter should call onChange with the correct params', () => {
      const {deleteIconWrapper, props} = setup();

      deleteIconWrapper.simulate('keyDown', {keyCode: KEY_CODES.Enter});

      expect(props.onChange).toHaveBeenCalledWith(deleteNode(props.node));
    });
  });

  describe('when it is not deletable', () => {
    it('should net render delete icon', () => {
      const {deleteIconWrapper} = setup({deletable: false});

      expect(deleteIconWrapper.length).toBe(0);
    });
  });
});
