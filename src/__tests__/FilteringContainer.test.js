import React from 'react';
import {shallow} from 'enzyme';

import FilteringContainer from '../FilteringContainer';
import {Nodes} from '../../testData/sampleTree';
import DefaultGroupRenderer from '../filtering/DefaultGroupRenderer';

describe('FilteringContainer', () => {
  const setup = (extraProps = {}) => {
    const child = jest.fn();

    const props = {nodes: Nodes, debouncer: v => v, ...extraProps};

    const wrapper = shallow(<FilteringContainer {...props}>{child}</FilteringContainer>);

    return {
      changeFilter: value => wrapper.find('input').simulate('change', {target: {value}}),
      getInjectedNodes: () => child.mock.calls.slice(-1)[0][0].nodes,
      wrapper,
      child,
      props,
    };
  };

  describe('filtering', () => {
    it('should not filter when searchTerm is empty', () => {
      const {wrapper, changeFilter, props, getInjectedNodes} = setup();

      changeFilter('');

      expect(getInjectedNodes()).toEqual(props.nodes);
    });

    it('should filter for deepsearch', () => {
      const {wrapper, changeFilter, getInjectedNodes} = setup();

      changeFilter('2');

      expect(getInjectedNodes()).toMatchSnapshot();
    });

    it('should filter when results match more then 1 node', () => {
      const {wrapper, changeFilter, getInjectedNodes} = setup();

      changeFilter('1');

      expect(getInjectedNodes()).toMatchSnapshot();
    });

    it('should filter when there are no results', () => {
      const {wrapper, changeFilter, getInjectedNodes} = setup();

      changeFilter('Node');

      expect(getInjectedNodes()).toEqual([]);
    });

    it('should ignore boundarie spaces when filtering', () => {
      const {wrapper, changeFilter, getInjectedNodes} = setup();

      changeFilter('1 ');

      expect(getInjectedNodes()).toMatchSnapshot();
    });

    it('should ignore casing when filtering', () => {
      const {wrapper, changeFilter, getInjectedNodes} = setup();

      changeFilter('LEAf 3');

      expect(getInjectedNodes()).toMatchSnapshot();
    });
  });

  describe('groups', () => {
    it('when groups do not exist should not render groups related info', () => {
      const {wrapper} = setup();

      expect(
        wrapper
          .find('div')
          .at(1)
          .hasClass('group'),
      ).toBe(false);

      expect(wrapper.find(DefaultGroupRenderer).length).toEqual(0);
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

        expect(
          wrapper
            .find('div')
            .at(1)
            .hasClass('group'),
        ).toBe(true);
      });

      it('should render the DefaultGroupRenderer when one is not injected as a prop', () => {
        const {wrapper, props} = setupWithGroups();

        expect(wrapper.find(DefaultGroupRenderer).props()).toEqual({
          groups: props.groups,
          selectedGroup: props.selectedGroup,
          onChange: props.onSelectedGroupChange,
        });
      });

      it('should render a injected groupRenderer', () => {
        const GroupRenderer = () => <div>Group renderer!</div>;

        const {wrapper, props} = setupWithGroups({
          groupRenderer: GroupRenderer,
        });

        expect(wrapper.find(GroupRenderer).props()).toEqual({
          groups: props.groups,
          selectedGroup: props.selectedGroup,
          onChange: props.onSelectedGroupChange,
        });
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
