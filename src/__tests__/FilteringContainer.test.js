import React from 'react';
import {render, cleanup} from 'react-testing-library';
import ReactTestUtils from 'react-dom/test-utils';

import FilteringContainer from '../FilteringContainer';
import {Nodes} from '../../testData/sampleTree';

describe('FilteringContainer', () => {
  afterEach(cleanup);

  const setup = (extraProps = {}) => {
    const child = jest.fn().mockImplementation(() => <div>Child</div>);

    const props = {nodes: Nodes, debouncer: v => v, ...extraProps};

    const wrapper = render(<FilteringContainer {...props}>{child}</FilteringContainer>);

    return {
      changeFilter: value => {
        const input = wrapper.getByPlaceholderText('Search...');

        ReactTestUtils.Simulate.change(input, {
          target: {
            value,
          },
        });
      },
      getInjectedNodes: () => {
        return child.mock.calls.slice(-1)[0][0].nodes;
      },
      wrapper,
      child,
      props,
    };
  };

  describe('filtering', () => {
    it('should not filter when searchTerm is empty', () => {
      const {changeFilter, props, getInjectedNodes} = setup();

      changeFilter('');

      expect(getInjectedNodes()).toEqual(props.nodes);
    });

    it('should filter for deepsearch', async () => {
      const {changeFilter, getInjectedNodes} = setup();

      changeFilter('2');

      expect(getInjectedNodes()).toMatchSnapshot();
    });

    it('should filter when results match more then 1 node', () => {
      const {changeFilter, getInjectedNodes} = setup();

      changeFilter('1');

      expect(getInjectedNodes()).toMatchSnapshot();
    });

    it('should filter when there are no results', () => {
      const {changeFilter, getInjectedNodes} = setup();

      changeFilter('Node');

      expect(getInjectedNodes()).toEqual([]);
    });

    it('should ignore boundarie spaces when filtering', () => {
      const {changeFilter, getInjectedNodes} = setup();

      changeFilter('1 ');

      expect(getInjectedNodes()).toMatchSnapshot();
    });

    it('should ignore casing when filtering', () => {
      const {changeFilter, getInjectedNodes} = setup();

      changeFilter('LEAf 3');

      expect(getInjectedNodes()).toMatchSnapshot();
    });
  });

  describe('groups', () => {
    it('when groups do not exist should not render groups related info', () => {
      const {wrapper} = setup();

      expect(wrapper.container.querySelector('.group')).toBeNull();
      expect(wrapper.container.querySelector('.tree-group')).toBeNull();
    });

    describe('when groups exist', () => {
      const EXPANDED = 'EXPANDED';

      const setupWithGroups = (extraProps = {}) =>
        setup({
          groups: {
            [EXPANDED]: {
              name: 'Expanded',
              filter: node => (node.state || {}).expanded,
            },
            FAVORITES: {
              name: 'Favorites',
              filter: node => (node.state || {}).favorite,
            },
          },
          selectedGroup: EXPANDED,
          onSelectedGroupChange: jest.fn(),
          ...extraProps,
        });

      it('should render the expected className', () => {
        const {wrapper} = setupWithGroups();

        expect(wrapper.container.querySelector('.group')).not.toBeNull();
      });

      it('should render the DefaultGroupRenderer when one is not injected as a prop', () => {
        const {wrapper} = setupWithGroups();

        expect(wrapper.container.querySelector('.tree-group')).toMatchSnapshot();
      });

      it('should render a injected groupRenderer', () => {
        const GroupRenderer = props => <div data-testid="group-renderer">Group renderer! {JSON.stringify(props)}</div>;

        const {wrapper} = setupWithGroups({
          groupRenderer: GroupRenderer,
        });

        expect(wrapper.getByTestId('group-renderer')).toMatchSnapshot();
      });

      it('should filter results based on the selected group', () => {
        const {getInjectedNodes} = setupWithGroups();

        expect(getInjectedNodes()).toMatchSnapshot();
      });

      it('should work when matched with filtering', () => {
        const {getInjectedNodes, changeFilter} = setupWithGroups();

        changeFilter('1');

        expect(getInjectedNodes()).toMatchSnapshot();
      });
    });
  });
});
