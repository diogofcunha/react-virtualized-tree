jest.mock('react-virtualized');

import React from 'react';
import {render, cleanup, fireEvent} from 'react-testing-library';

import Tree, {renderers} from '../..';
import {
  Nodes,
  EXPANDED_NODE_IN_ROOT,
  EXPANDED_CHILDREN,
  COLLAPSED_NODE_IN_ROOT,
  COLLAPSED_CHILDREN,
  DELETABLE_IN_ROOT,
  DELETABLE_CHILDREN,
} from '../../../testData/sampleTree';
import NodeDiff from '../../../tests/NodeDiff';

const {Expandable, Deletable, Favorite} = renderers;

const EXPAND_ICON_CN = 'EXPAND';
const COLLAPSE_ICON_CN = 'COLLAPSE';
const DELETE_ICON_CN = 'DELETE';
const FAVORITE_ICON_CN = 'FAVORITE';
const UNFAVORITE_ICON_CN = 'UNFAVORITE';

class Example extends React.Component {
  state = {
    nodes: Nodes,
  };

  handleChange = nodes => {
    this.setState({nodes});
  };

  render() {
    return (
      <Tree nodes={this.state.nodes} onChange={this.handleChange}>
        {({style, node, ...rest}) => (
          <div style={style} data-testid={node.id} data-type="node">
            <Expandable
              node={node}
              {...rest}
              iconsClassNameMap={{
                expanded: EXPAND_ICON_CN,
                collapsed: COLLAPSE_ICON_CN,
              }}
            >
              {node.name}
              <Deletable node={node} {...rest} iconsClassNameMap={{delete: DELETE_ICON_CN}}>
                <Favorite
                  node={node}
                  {...rest}
                  iconsClassNameMap={{favorite: FAVORITE_ICON_CN, notFavorite: UNFAVORITE_ICON_CN}}
                />
              </Deletable>
            </Expandable>
          </div>
        )}
      </Tree>
    );
  }
}

describe('Tree with exposed renderers', () => {
  afterEach(cleanup);

  describe('Expandable', () => {
    describe('when collapsing a node in the root', () => {
      test('should change the icon from expand to collapse', () => {
        const {getByTestId} = render(<Example />);
        const {id} = EXPANDED_NODE_IN_ROOT;

        let targetExpandedNode = getByTestId(`${id}`);
        expect(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).toBeNull();

        fireEvent.click(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`));

        targetExpandedNode = getByTestId(`${id}`);
        expect(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).not.toBeNull();
        expect(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`)).toBeNull();
      });

      test('should hide the children nodes', () => {
        const {getByTestId} = render(<Example />);
        const {id, children} = EXPANDED_NODE_IN_ROOT;

        children.forEach(c => {
          expect(getByTestId(`${c.id}`)).toBeDefined();
        });

        let targetExpandedNode = getByTestId(`${id}`);
        fireEvent.click(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`));

        children.forEach(c => {
          expect(() => getByTestId(`${c.id}`)).toThrow();
        });
      });

      test('should affect the expected nodes', () => {
        const {getByTestId, container} = render(<Example />);
        const {id} = EXPANDED_NODE_IN_ROOT;
        const diff = new NodeDiff(container);

        let targetExpandedNode = getByTestId(`${id}`);
        fireEvent.click(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`));

        expect(diff.run(container)).toMatchInlineSnapshot(`
                                                            Object {
                                                              "changed": Array [
                                                                "0",
                                                              ],
                                                              "mounted": Array [],
                                                              "unmounted": Array [
                                                                "2",
                                                                "3",
                                                                "4",
                                                                "5",
                                                              ],
                                                            }
                                                `);
      });
    });

    describe('when collapsing a node deep within', () => {
      test('should change the icon from expand to collapse', () => {
        const {getByTestId} = render(<Example />);
        const {id} = EXPANDED_CHILDREN;

        let targetExpandedNode = getByTestId(`${id}`);
        expect(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).toBeNull();

        fireEvent.click(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`));

        targetExpandedNode = getByTestId(`${id}`);
        expect(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).not.toBeNull();
        expect(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`)).toBeNull();
      });

      test('should hide the children nodes', () => {
        const {getByTestId} = render(<Example />);
        const {id, children} = EXPANDED_CHILDREN;

        children.forEach(c => {
          expect(getByTestId(`${c.id}`)).toBeDefined();
        });

        let targetExpandedNode = getByTestId(`${id}`);
        fireEvent.click(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`));

        children.forEach(c => {
          expect(() => getByTestId(`${c.id}`)).toThrow();
        });
      });

      test('should affect the expected nodes', () => {
        const {getByTestId, container} = render(<Example />);
        const {id} = EXPANDED_CHILDREN;
        const diff = new NodeDiff(container);

        let targetExpandedNode = getByTestId(`${id}`);
        fireEvent.click(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`));

        expect(diff.run(container)).toMatchInlineSnapshot(`
                                                  Object {
                                                    "changed": Array [
                                                      "2",
                                                    ],
                                                    "mounted": Array [],
                                                    "unmounted": Array [
                                                      "3",
                                                      "4",
                                                    ],
                                                  }
                                        `);
      });
    });

    describe('when expanding a node in the root', () => {
      test('should change the icon from collapse to expand', () => {
        const {getByTestId} = render(<Example />);
        const {id} = COLLAPSED_NODE_IN_ROOT;

        let targetExpandedNode = getByTestId(`${id}`);
        expect(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`)).toBeNull();

        fireEvent.click(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`));

        targetExpandedNode = getByTestId(`${id}`);
        expect(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`)).not.toBeNull();
        expect(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).toBeNull();
      });

      test('should show the children nodes', () => {
        const {getByTestId} = render(<Example />);
        const {id, children} = COLLAPSED_NODE_IN_ROOT;

        children.forEach(c => {
          expect(() => getByTestId(`${c.id}`)).toThrow();
        });

        let targetExpandedNode = getByTestId(`${id}`);
        fireEvent.click(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`));

        children.forEach(c => {
          expect(getByTestId(`${c.id}`)).toBeDefined();
        });
      });

      test('should affect the expected nodes', () => {
        const {getByTestId, container} = render(<Example />);
        const {id} = COLLAPSED_NODE_IN_ROOT;
        const diff = new NodeDiff(container);

        let targetExpandedNode = getByTestId(`${id}`);
        fireEvent.click(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`));

        expect(diff.run(container)).toMatchInlineSnapshot(`
                                        Object {
                                          "changed": Array [
                                            "1",
                                          ],
                                          "mounted": Array [
                                            "6",
                                            "9",
                                          ],
                                          "unmounted": Array [],
                                        }
                                `);
      });
    });

    describe('when expanding a node deep within', () => {
      test('should change the icon from collapse to expand', () => {
        const {getByTestId} = render(<Example />);
        const {id} = COLLAPSED_CHILDREN;

        let targetExpandedNode = getByTestId(`${id}`);
        expect(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`)).toBeNull();

        fireEvent.click(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`));

        targetExpandedNode = getByTestId(`${id}`);
        expect(targetExpandedNode.querySelector(`.${EXPAND_ICON_CN}`)).not.toBeNull();
        expect(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).toBeNull();
      });

      test('should show the children nodes', () => {
        const {getByTestId} = render(<Example />);
        const {id, children} = COLLAPSED_CHILDREN;

        children.forEach(c => {
          expect(() => getByTestId(`${c.id}`)).toThrow();
        });

        let targetExpandedNode = getByTestId(`${id}`);
        fireEvent.click(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`));

        children.forEach(c => {
          expect(getByTestId(`${c.id}`)).toBeDefined();
        });
      });

      test('should affect the expected nodes', () => {
        const {getByTestId, container} = render(<Example />);
        const {id} = COLLAPSED_CHILDREN;
        const diff = new NodeDiff(container);

        let targetExpandedNode = getByTestId(`${id}`);
        fireEvent.click(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`));

        expect(diff.run(container)).toMatchInlineSnapshot(`
                              Object {
                                "changed": Array [
                                  "3",
                                ],
                                "mounted": Array [
                                  "c-3",
                                ],
                                "unmounted": Array [],
                              }
                        `);
      });
    });
  });

  describe('Deletable', () => {
    describe('when deleting a node in the root', () => {
      test('should delete the node', () => {
        const {getByTestId} = render(<Example />);

        const {id} = DELETABLE_IN_ROOT;

        let renderedNode = getByTestId(`${id}`);
        const collapsedNode = renderedNode.querySelector(`.${DELETE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        expect(() => getByTestId(`${id}`)).toThrow();
      });

      test('should affect the expected nodes', () => {
        const {getByTestId, container} = render(<Example />);
        const diff = new NodeDiff(container);

        const {id} = DELETABLE_IN_ROOT;

        let renderedNode = getByTestId(`${id}`);
        const collapsedNode = renderedNode.querySelector(`.${DELETE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        expect(diff.run(container)).toMatchInlineSnapshot(`
                    Object {
                      "changed": Array [],
                      "mounted": Array [],
                      "unmounted": Array [
                        "z",
                      ],
                    }
                `);
      });
    });

    describe('when deleting a node deep within', () => {
      test('should delete the node and the children', () => {
        const {getByTestId} = render(<Example />);

        const {id, children} = DELETABLE_CHILDREN;
        children.forEach(c => {
          expect(getByTestId(`${c.id}`)).toBeDefined();
        });

        let renderedNode = getByTestId(`${id}`);
        const collapsedNode = renderedNode.querySelector(`.${DELETE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        expect(() => getByTestId(`${id}`)).toThrow();

        children.forEach(c => {
          expect(() => getByTestId(`${c.id}`)).toThrow();
        });
      });

      test('should affect the expected nodes', () => {
        const {getByTestId, container} = render(<Example />);
        const diff = new NodeDiff(container);

        const {id} = DELETABLE_CHILDREN;

        let renderedNode = getByTestId(`${id}`);
        const collapsedNode = renderedNode.querySelector(`.${DELETE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        expect(diff.run(container)).toMatchInlineSnapshot(`
          Object {
            "changed": Array [],
            "mounted": Array [],
            "unmounted": Array [
              "2",
              "3",
              "4",
            ],
          }
        `);
      });
    });
  });

  describe('Favorite', () => {
    describe('when favoring a node in the root', () => {
      const getUnFavoriteInRoot = () => Nodes.find(n => n.state && !n.state.favorite);

      test('should change the icon', () => {
        const {getByTestId} = render(<Example />);
        const {id} = getUnFavoriteInRoot();

        let targetNode = getByTestId(`${id}`);

        expect(targetNode.querySelector(`.${FAVORITE_ICON_CN}`)).toBeNull();

        const collapsedNode = targetNode.querySelector(`.${UNFAVORITE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        targetNode = getByTestId(`${id}`);

        expect(targetNode.querySelector(`.${UNFAVORITE_ICON_CN}`)).toBeNull();
        expect(targetNode.querySelector(`.${FAVORITE_ICON_CN}`)).not.toBeNull();
      });

      test('should only affect the node itself', () => {
        const {getByTestId, container} = render(<Example />);
        const diff = new NodeDiff(container);

        const {id} = getUnFavoriteInRoot();

        let targetNode = getByTestId(`${id}`);
        const collapsedNode = targetNode.querySelector(`.${UNFAVORITE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        expect(diff.run(container)).toEqual({changed: [`${id}`], unmounted: [], mounted: []});
      });
    });

    describe('when favoring a node deep within', () => {
      const getUnFavoriteDeep = () => EXPANDED_NODE_IN_ROOT.children.find(n => n.state && !n.state.favorite);

      test('should change the icon', () => {
        const {getByTestId} = render(<Example />);
        const {id} = getUnFavoriteDeep();

        let targetNode = getByTestId(`${id}`);

        expect(targetNode.querySelector(`.${FAVORITE_ICON_CN}`)).toBeNull();

        const collapsedNode = targetNode.querySelector(`.${UNFAVORITE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        targetNode = getByTestId(`${id}`);

        expect(targetNode.querySelector(`.${UNFAVORITE_ICON_CN}`)).toBeNull();
        expect(targetNode.querySelector(`.${FAVORITE_ICON_CN}`)).not.toBeNull();
      });

      test('should only affect the node itself', () => {
        const {getByTestId, container} = render(<Example />);
        const diff = new NodeDiff(container);

        const {id} = getUnFavoriteDeep();

        let targetNode = getByTestId(`${id}`);
        const collapsedNode = targetNode.querySelector(`.${UNFAVORITE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        expect(diff.run(container)).toEqual({changed: [`${id}`], unmounted: [], mounted: []});
      });
    });

    describe('when removing favorite from a node in the root', () => {
      const getFavoriteInRoot = () => Nodes.find(n => n.state && n.state.favorite);

      test('should change the icon', () => {
        const {getByTestId} = render(<Example />);
        const {id} = getFavoriteInRoot();

        let targetNode = getByTestId(`${id}`);

        expect(targetNode.querySelector(`.${UNFAVORITE_ICON_CN}`)).toBeNull();

        const collapsedNode = targetNode.querySelector(`.${FAVORITE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        targetNode = getByTestId(`${id}`);

        expect(targetNode.querySelector(`.${FAVORITE_ICON_CN}`)).toBeNull();
        expect(targetNode.querySelector(`.${UNFAVORITE_ICON_CN}`)).not.toBeNull();
      });

      test('should only affect the node itself', () => {
        const {getByTestId, container} = render(<Example />);
        const diff = new NodeDiff(container);

        const {id} = getFavoriteInRoot();

        let targetNode = getByTestId(`${id}`);
        const collapsedNode = targetNode.querySelector(`.${FAVORITE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        expect(diff.run(container)).toEqual({changed: [`${id}`], unmounted: [], mounted: []});
      });
    });

    describe('when removing favorite from a node deep within', () => {
      // Do it in the tree
      const getFavoriteDeep = () => {
        const n = EXPANDED_NODE_IN_ROOT.children.find(n => n.state && !n.state.favorite);
      };

      test('should change the icon', () => {
        const {getByTestId} = render(<Example />);

        let targetNode = getByTestId(`3`);

        expect(targetNode.querySelector(`.${UNFAVORITE_ICON_CN}`)).toBeNull();

        const collapsedNode = targetNode.querySelector(`.${FAVORITE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        targetNode = getByTestId(`3`);

        expect(targetNode.querySelector(`.${FAVORITE_ICON_CN}`)).toBeNull();
        expect(targetNode.querySelector(`.${UNFAVORITE_ICON_CN}`)).not.toBeNull();
      });

      test('should only affect the node itself', () => {
        const {getByTestId, container} = render(<Example />);
        const diff = new NodeDiff(container);

        let targetNode = getByTestId('3');
        const collapsedNode = targetNode.querySelector(`.${FAVORITE_ICON_CN}`);
        fireEvent.click(collapsedNode);

        expect(diff.run(container)).toEqual({changed: [`3`], unmounted: [], mounted: []});
      });
    });
  });
});
