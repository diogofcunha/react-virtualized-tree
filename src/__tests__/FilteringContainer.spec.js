import React from 'react';
import { shallow } from 'enzyme';

import FilteringContainer from '../FilteringContainer';
import { Nodes } from '../../testData/sampleTree';

describe('FilteringContainer', () => {
  const setup = () => shallow(
    <FilteringContainer nodes={Nodes}>
      {
        () => <div></div>
      }
    </FilteringContainer>
  );

  it('should filter for deepsearch', () => {
    const wrapper = setup();

    wrapper.find('input').simulate('change', { target: { value: '2' } });

    const { filteredNodes } = wrapper.state();

    expect(filteredNodes).toMatchSnapshot();
  });

  it('should filter when results match more then 1 node', () => {
    const wrapper = setup();

    wrapper.find('input').simulate('change', { target: { value: '1' } });

    const { filteredNodes } = wrapper.state();

    expect(filteredNodes).toMatchSnapshot();
  });

  it('should filter when there are no results', () => {
    const wrapper = setup();

    wrapper.find('input').simulate('change', { target: { value: 'Node' } });

    const { filteredNodes } = wrapper.state();

    expect(filteredNodes).toMatchSnapshot();
  });
});
