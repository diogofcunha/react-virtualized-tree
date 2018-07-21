import React from 'react';
import {shallow} from 'enzyme';

import DefaultGroupRenderer from '../DefaultGroupRenderer';

describe('DefaultGroupRenderer', () => {
  const setup = (extraProps = {}) => {
    const onChange = jest.fn();

    const props = {
      onChange,
      groups: {
        ALL: {
          name: 'All',
          filter: () => {},
        },
        TOP: {
          name: 'Top',
          filter: () => {},
        },
        BOTTOM: {
          name: 'Bottom',
          filter: () => {},
        },
      },
      selectedGroup: 'TOP',
      ...extraProps,
    };

    const wrapper = shallow(<DefaultGroupRenderer {...props} />);

    return {
      wrapper,
      props,
    };
  };

  it('should render an option for each group', () => {
    const {wrapper} = setup();

    expect(wrapper.find('option').map(o => o.text())).toMatchSnapshot();
  });

  it('should render the select with the correct value', () => {
    const {wrapper, props} = setup();

    expect(wrapper.find('select').props().value).toBe(props.selectedGroup);
  });

  it('changing the selection should call onChange with the correct params', () => {
    const {wrapper, props} = setup();
    const value = 'BOTTOM';

    wrapper.find('select').simulate('change', {target: {value}});

    expect(props.onChange).toHaveBeenCalledWith(value);
  });
});
