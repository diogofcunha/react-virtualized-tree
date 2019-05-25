jest.mock('react-virtualized');

import React from 'react';
import {render, cleanup} from 'react-testing-library';
import ReactTestUtils from 'react-dom/test-utils';

import Tree, {renderers} from '../..';
import NodeDiff from '../../../tests/NodeDiff';
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
            },
          },
          {
            id: 2,
            name: 'graphql',
            state: {
              expanded: true,
            },
          },
          {
            id: 3,
            name: 'jest',
            state: {
              expanded: true,
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
            },
          },
          {
            id: 6,
            name: 'angular',
            state: {
              expanded: true,
            },
          },
          {
            id: 7,
            name: 'google-cloud',
            state: {
              expanded: true,
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
            },
          },
          {
            id: 10,
            name: 'vscode',
            state: {
              expanded: true,
            },
          },
          {
            id: 11,
            name: 'azure',
            state: {
              expanded: true,
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
              },
              {
                id: 15,
                name: 'azure',
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
              },
              {
                id: 18,
                name: 'vue',
              },
              {
                id: 19,
                name: 'angular',
              },
            ],
          },
        ],
      },
    ],
  };

  handleChange = nodes => {
    this.setState({nodes});
  };

  render() {
    return (
      <FilteringContainer nodes={this.state.nodes} debouncer={v => v}>
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

  const setup = () => {
    const wrapper = render(<Example />);

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
      const diff = new NodeDiff(wrapper.container);

      search('Top Microsoft');

      expect(diff.run(wrapper.container)).toMatchInlineSnapshot(`
                        Object {
                          "changed": Array [
                            "8",
                          ],
                          "mounted": Array [],
                          "unmounted": Array [
                            "0",
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "9",
                            "10",
                            "11",
                            "12",
                            "13",
                            "16",
                            "17",
                            "18",
                            "19",
                          ],
                        }
                  `);
    });

    test('should render as expected when trying to search for nodes expanded deep within', () => {
      const {wrapper, search} = setup();
      const diff = new NodeDiff(wrapper.container);

      search('react');

      expect(diff.run(wrapper.container)).toMatchInlineSnapshot(`
                Object {
                  "changed": Array [],
                  "mounted": Array [],
                  "unmounted": Array [
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "13",
                    "18",
                    "19",
                  ],
                }
            `);
    });

    test('should render as expected when trying to search for nodes collapsed deep within', () => {
      const {wrapper, search} = setup();
      const diff = new NodeDiff(wrapper.container);

      search('google-cloud');

      expect(diff.run(wrapper.container)).toMatchInlineSnapshot(`
        Object {
          "changed": Array [],
          "mounted": Array [],
          "unmounted": Array [
            "0",
            "1",
            "2",
            "3",
            "5",
            "6",
            "8",
            "9",
            "10",
            "11",
            "16",
            "17",
            "18",
            "19",
          ],
        }
      `);
    });
  });
});
