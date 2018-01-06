import React from 'react';
import { shallow } from 'enzyme';

import Expandable from '../Expandable';
import { KEY_CODES } from '../../eventWrappers';
import { udpateNode } from '../../selectors/nodes';

describe('renderers Expandable', () => {
  const findExpandIcon = wrapper => wrapper.find('i');

  const setup = (state = {}, extraProps = {}) => {
    const baseProps = {
      onChange: jest.fn(),
      node: {
        state,
        children: [{}]        
      },
      iconsClassNameMap: {
        expanded: 'expanded',
        collapsed: 'colpased'
      }    
    }

    const props = { ...baseProps, ...extraProps };
    const wrapper = shallow(<Expandable {...props} />)

    return { props, wrapper, expandIconWrapper: findExpandIcon(wrapper) };
  }

  describe('when contains children', () => {
    describe('when expanded', () => {
      it('should render a with the supplied className when expanded', () => {
        const { expandIconWrapper, props } = setup({ expanded: true });

        expect(expandIconWrapper.hasClass(props.iconsClassNameMap.expanded)).toBeTruthy();
      });

      it('clicking should call onChange with the correct params', () => {
        const { expandIconWrapper, props } = setup({ expanded: true });
        
        expandIconWrapper.simulate('click');

        expect(props.onChange).toHaveBeenCalledWith(
          udpateNode(
            props.node, 
            { expanded: false }
          )
        );
      });

      it('pressing enter should call onChange with the correct params', () => {
        const { expandIconWrapper, props } = setup({ expanded: true });
        
        expandIconWrapper.simulate('keyDown', { keyCode: KEY_CODES.Enter });

        expect(props.onChange).toHaveBeenCalledWith(
          udpateNode(
            props.node, 
            { expanded: false }
          )
        )
      });
    });

    describe('when collapsed', () => {
      it('should render a with the supplied className when expanded', () => {
        const { expandIconWrapper, props } = setup({ expanded: false });
        
        expect(expandIconWrapper.hasClass(props.iconsClassNameMap.collapsed)).toBeTruthy();
      })

      it('clicking should call onChange with the correct params', () => {
        const { expandIconWrapper, props } = setup({ expanded: false });
        
        expandIconWrapper.simulate('click');

        expect(props.onChange).toHaveBeenCalledWith(
          udpateNode(
            props.node, 
            { expanded: true }
          )
        )
      });

      it('pressing enter should call onChange with the correct params', () => {
        const { expandIconWrapper, props } = setup({ expanded: false });
        
        expandIconWrapper.simulate('keyDown', { keyCode: KEY_CODES.Enter });

        expect(props.onChange).toHaveBeenCalledWith(
          udpateNode(
            props.node, 
            { expanded: true }
          )
        )
      });
    });
  });
});