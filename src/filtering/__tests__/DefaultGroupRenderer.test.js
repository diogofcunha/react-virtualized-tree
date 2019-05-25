import React from 'react';
import {render, cleanup, fireEvent} from 'react-testing-library';

import DefaultGroupRenderer from '../DefaultGroupRenderer';

describe('DefaultGroupRenderer', () => {
  const setup = (extraProps = {}) => {
    const props = {
      onChange: jest.fn(),
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

    return {
      ...render(<DefaultGroupRenderer {...props} />),
      props,
    };
  };

  it('should render an option for each group', () => {
    const {container} = setup();
    const options = container.querySelectorAll('option');

    const optionsText = [];

    options.forEach(o => {
      optionsText.push(o.text);
    });

    expect(optionsText).toMatchSnapshot();
  });

  it('should render the select with the correct value', () => {
    const {container, props} = setup();
    const select = container.querySelector('select');

    expect(select.value).toBe(props.selectedGroup);
  });

  it('changing the selection should call onChange with the correct params', () => {
    const {props, container} = setup();
    const value = 'BOTTOM';

    const select = container.querySelector('select');
    select.value = value;

    fireEvent.change(select);

    expect(props.onChange).toHaveBeenCalledWith(value);
  });
});
