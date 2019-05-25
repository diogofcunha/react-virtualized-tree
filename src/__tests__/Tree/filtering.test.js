jest.mock('react-virtualized');

import React from 'react';
import {render, cleanup, fireEvent} from 'react-testing-library';
import ReactTestUtils from 'react-dom/test-utils';

import Tree, {renderers} from '../..';
import FilteringContainer from '../../FilteringContainer';

const {Expandable} = renderers;

class Example extends React.Component {
  state = {
    nodes: [
      {
        id: 0,
        name: 'Top Facebook Eng Tags',
        state: {
          expanded: true,
        },
        children: [
          {
            id: 1,
            name: 'react',
            state: {
              expanded: true,
              tags: ['javascript', 'open-source'],
            },
          },
          {
            id: 2,
            name: 'graphql',
            state: {
              expanded: true,
              tags: ['open-source', 'api'],
            },
          },
          {
            id: 3,
            name: 'jest',
            state: {
              expanded: true,
              tags: ['javascript', 'open-source'],
            },
          },
        ],
      },
      {
        id: 4,
        name: 'Top Google Eng Tags',
        state: {
          expanded: true,
        },
        children: [
          {
            id: 5,
            name: 'chrome',
            state: {
              expanded: true,
              tags: ['browser'],
            },
          },
          {
            id: 21,
            name: 'chromium',
            state: {
              expanded: true,
              tags: ['browser', 'open-source'],
            },
          },
          {
            id: 20,
            name: 'chromium os',
            state: {
              expanded: true,
              tags: ['browser', 'open-source'],
            },
          },
          {
            id: 6,
            name: 'angular',
            state: {
              expanded: true,
              tags: ['javascript', 'open-source'],
            },
          },
          {
            id: 7,
            name: 'google-cloud',
            state: {
              expanded: true,
              tags: ['cloud'],
            },
          },
        ],
      },
      {
        id: 8,
        name: 'Top Microsoft Eng Tags',
        state: {
          expanded: true,
        },
        children: [
          {
            id: 9,
            name: 'typescript',
            state: {
              expanded: true,
              tags: ['javascript', 'open-source'],
            },
          },
          {
            id: 10,
            name: 'vscode',
            state: {
              expanded: true,
              tags: ['code-editor'],
            },
          },
          {
            id: 11,
            name: 'azure',
            state: {
              expanded: true,
              tags: ['cloud'],
            },
          },
        ],
      },
      {
        id: 12,
        name: 'Top Global Eng Tags',
        state: {
          expanded: true,
        },
        children: [
          {
            id: 13,
            name: 'clouds',
            state: {
              expanded: false,
            },
            children: [
              {
                id: 14,
                name: 'google-cloud',
                tags: ['cloud'],
              },
              {
                id: 15,
                name: 'azure',
                tags: ['cloud'],
              },
            ],
          },
          {
            id: 16,
            name: 'front-end',
            state: {
              expanded: true,
            },
            children: [
              {
                id: 17,
                name: 'react',
                tags: ['javascript', 'open-source'],
              },
              {
                id: 18,
                name: 'vue',
                tags: ['javascript', 'open-source'],
              },
              {
                id: 19,
                name: 'angular',
                tags: ['javascript', 'open-source'],
              },
            ],
          },
        ],
      },
    ],
    selectedGroup: undefined,
  };

  handleChange = nodes => {
    this.setState({nodes});
  };

  handleSelectedGroupChange = selectedGroup => {
    this.setState({selectedGroup});
  };

  render() {
    return (
      <FilteringContainer
        nodes={this.state.nodes}
        debouncer={v => v}
        selectedGroup={this.state.selectedGroup}
        onSelectedGroupChange={this.handleSelectedGroupChange}
        {...this.props}
      >
        {({nodes}) => (
          <Tree nodes={nodes} onChange={this.handleChange}>
            {({style, node, ...rest}) => (
              <div style={style} data-testid={node.id} data-type="node">
                <Expandable node={node} {...rest}>
                  {node.name}
                </Expandable>
              </div>
            )}
          </Tree>
        )}
      </FilteringContainer>
    );
  }
}

describe('Tree with filtering container', () => {
  afterEach(cleanup);

  const getRenderedNodesNames = container => {
    const nodes = container.querySelectorAll('[data-type="node"]');

    const names = [];
    nodes.forEach(n => {
      names.push(n.textContent);
    });

    return names;
  };

  const setup = (props = {}) => {
    const wrapper = render(<Example {...props} />);

    return {
      search: value => {
        const input = wrapper.getByPlaceholderText('Search...');

        ReactTestUtils.Simulate.change(input, {
          target: {
            value,
          },
        });
      },
      wrapper,
    };
  };

  describe('without groups', () => {
    test('should render an empty tree when search does not match any node', () => {
      const {wrapper, search} = setup();

      search('Random');

      expect(wrapper.container.querySelector('[data-type="node"]')).toBeNull();
    });

    test('should render as expected when trying to search for a node in the root', () => {
      const {wrapper, search} = setup();

      search('Top Microsoft');

      expect(getRenderedNodesNames(wrapper.container)).toMatchInlineSnapshot(`
        Array [
          "Top Microsoft Eng Tags",
        ]
      `);
    });

    test('should render as expected when trying to search for nodes expanded deep within', () => {
      const {wrapper, search} = setup();
      search('react');

      expect(getRenderedNodesNames(wrapper.container)).toMatchInlineSnapshot(`
                Array [
                  "Top Facebook Eng Tags",
                  "react",
                  "Top Global Eng Tags",
                  "front-end",
                  "react",
                ]
            `);
    });

    test('should render as expected when trying to search for nodes collapsed deep within', () => {
      const {wrapper, search} = setup();

      search('google-cloud');

      expect(getRenderedNodesNames(wrapper.container)).toMatchInlineSnapshot(`
                Array [
                  "Top Google Eng Tags",
                  "google-cloud",
                  "Top Global Eng Tags",
                  "clouds",
                ]
            `);
    });
  });

  describe('with groups', () => {
    const setupWithGroups = () => {
      const rendered = setup({
        groups: {
          JS: {
            name: 'JS',
            filter: ({state = {}}) => {
              const {tags = []} = state;

              return tags.includes('javascript');
            },
          },
          OPEN_SOURCE: {
            name: 'OPEN_SOURCE',
            filter: ({state = {}}) => {
              const {tags = []} = state;

              return tags.includes('open-source');
            },
          },
        },
      });

      return {
        ...rendered,
        selectGroup: value => {
          const {container} = rendered.wrapper;

          const select = container.querySelector('select');
          select.value = value;

          fireEvent.change(select);
        },
      };
    };

    test('should render and filter as expected when selecting a group', () => {
      const {wrapper, selectGroup} = setupWithGroups();

      selectGroup('JS');

      expect(getRenderedNodesNames(wrapper.container)).toMatchInlineSnapshot(`
                        Array [
                          "Top Facebook Eng Tags",
                          "react",
                          "jest",
                          "Top Google Eng Tags",
                          "angular",
                          "Top Microsoft Eng Tags",
                          "typescript",
                        ]
                  `);
    });

    test('should render an empty tree when search does not match any node in the group', () => {
      const {wrapper, search, selectGroup} = setupWithGroups();

      // Before selecting the group the search should return
      search('azure');
      expect(wrapper.container.querySelector('[data-type="node"]')).not.toBeNull();

      selectGroup('JS');
      search('azure');

      expect(wrapper.container.querySelector('[data-type="node"]')).toBeNull();
    });

    test('should render and filter a tree correctly using the group and search term', () => {
      const {wrapper, search, selectGroup} = setupWithGroups();

      selectGroup('OPEN_SOURCE');
      search('chrom');

      expect(getRenderedNodesNames(wrapper.container)).toMatchInlineSnapshot(`
                                Array [
                                  "Top Google Eng Tags",
                                  "chromium",
                                  "chromium os",
                                ]
                        `);
    });
  });
});
