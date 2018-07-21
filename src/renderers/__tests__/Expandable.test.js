import React from 'react';
import {shallow} from 'enzyme';

import Expandable from '../Expandable';
import {KEY_CODES} from '../../eventWrappers';
import {updateNode} from '../../selectors/nodes';

describe('renderers Expandable', () => {
  const findExpandIcon = wrapper => wrapper.find('i');

  const setup = (state = {}, extraProps = {}) => {
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
        expanded: 'expanded',
        collapsed: 'colpased',
      },
      measure: jest.fn(),
    };

    const props = {...baseProps, ...extraProps};
    const wrapper = shallow(<Expandable {...props} />);

    return {props, wrapper, expandIconWrapper: findExpandIcon(wrapper)};
  };

  describe('when contains children', () => {
    describe('when expanded', () => {
      it('should render a with the supplied className when expanded', () => {
        const {expandIconWrapper, props} = setup({expanded: true});

        expect(expandIconWrapper.hasClass(props.iconsClassNameMap.expanded)).toBeTruthy();
      });

      it('clicking should call onChange with the correct params', () => {
        const {expandIconWrapper, props} = setup({expanded: true});

        expandIconWrapper.simulate('click');

        expect(props.onChange).toHaveBeenCalledWith(updateNode(props.node, {expanded: false}));
      });

      it('pressing enter should call onChange with the correct params', () => {
        const {expandIconWrapper, props} = setup({expanded: true});

        expandIconWrapper.simulate('keyDown', {keyCode: KEY_CODES.Enter});

        expect(props.onChange).toHaveBeenCalledWith(updateNode(props.node, {expanded: false}));
      });

      it('double clicking in the parent node should call onChange with the correct params', () => {
        const {props, wrapper} = setup({expanded: true});

        wrapper.first().simulate('doubleClick');

        expect(props.onChange).toHaveBeenCalledWith(updateNode(props.node, {expanded: false}));
      });
    });

    describe('when collapsed', () => {
      it('should render a with the supplied className when expanded', () => {
        const {expandIconWrapper, props} = setup({expanded: false});

        expect(expandIconWrapper.hasClass(props.iconsClassNameMap.collapsed)).toBeTruthy();
      });

      it('clicking should call onChange with the correct params', () => {
        const {expandIconWrapper, props} = setup({expanded: false});

        expandIconWrapper.simulate('click');

        expect(props.onChange).toHaveBeenCalledWith(updateNode(props.node, {expanded: true}));
      });

      it('pressing enter should call onChange with the correct params', () => {
        const {expandIconWrapper, props} = setup({expanded: false});

        expandIconWrapper.simulate('keyDown', {keyCode: KEY_CODES.Enter});

        expect(props.onChange).toHaveBeenCalledWith(updateNode(props.node, {expanded: true}));
      });

      it('double clicking in the parent node should call onChange with the correct params', () => {
        const {props, wrapper} = setup({expanded: false});

        wrapper.first().simulate('doubleClick');

        expect(props.onChange).toHaveBeenCalledWith(updateNode(props.node, {expanded: true}));
      });
    });
  });
});
