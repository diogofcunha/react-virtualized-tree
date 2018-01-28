import React from 'react';
import { shallow } from 'enzyme';

import FilteringContainer from '../FilteringContainer';
import { Nodes } from '../../testData/sampleTree';

describe('FilteringContainer', () => {
  const setup = (extraProps = {}) => {
    const child = jest.fn();

    const props = { nodes: Nodes, ...extraProps };

    const wrapper = shallow(
      <FilteringContainer {...props}>
        { child }
      </FilteringContainer>
    );

    return {
      changeFilter: value => wrapper.find('input').simulate('change', { target: { value } }),
      getInjectedNodes: () => child.mock.calls.slice(-1)[0][0].nodes,
      wrapper,
      child,
      props
    }
  }

  describe('filtering', () => {
    it('should not filter when searchTerm is empty', () => {
      const { wrapper , changeFilter, props, getInjectedNodes } = setup();

      changeFilter('');

      expect(getInjectedNodes()).toEqual(props.nodes);
    });

    it('should filter for deepsearch', () => {
      const { wrapper , changeFilter, getInjectedNodes } = setup();
  
      changeFilter('2');
      
      expect(getInjectedNodes()).toMatchSnapshot();
    });
  
    it('should filter when results match more then 1 node', () => {
      const { wrapper , changeFilter, getInjectedNodes } = setup();
  
      changeFilter('1');
    
      expect(getInjectedNodes()).toMatchSnapshot();
    });
  
    it('should filter when there are no results', () => {
      const { wrapper , changeFilter, getInjectedNodes } = setup();
  
      changeFilter('Node');
    
      expect(getInjectedNodes()).toEqual([]);
    });

    it('should ignore boundarie spaces when filtering', () => {
      const { wrapper , changeFilter, getInjectedNodes } = setup();
  
      changeFilter('1 ');
    
      expect(getInjectedNodes()).toMatchSnapshot();
    });

    it('should ignore casing when filtering', () => {
      const { wrapper , changeFilter, getInjectedNodes } = setup();
  
      changeFilter('LEAf 3');
    
      expect(getInjectedNodes()).toMatchSnapshot();
    })
  });
});
