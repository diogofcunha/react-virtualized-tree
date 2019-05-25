jest.mock('react-virtualized');

import React from 'react';
import {render, cleanup, fireEvent} from 'react-testing-library';

import Tree, {constants, renderers} from '../..';
const {Expandable} = renderers;

import {Nodes, EXPANDED_NODE_IN_ROOT, COLLAPSED_NODE_IN_ROOT} from '../../../testData/sampleTree';
import NodeDiff from '../../../tests/NodeDiff';

const EXPAND_ICON_CN = 'EXPAND';
const COLLAPSE_ICON_CN = 'COLLAPSE';

// Create a new type, renderer and a function to handle updates for selection
const SELECT = 3;

const SelectionRender = ({node, children, onChange}) => {
  const {state: {selected} = {}} = node;

  return (
    <span>
      <input
        type="checkbox"
        checked={selected}
        onClick={() =>
          onChange({
            node: {
              ...node,
              state: {
                ...(node.state || {}),
                selected: !selected,
              },
            },
            type: SELECT,
          })
        }
      />
      {children}
    </span>
  );
};

const selectNodes = (nodes, selected) =>
  nodes.map(n => ({
    ...n,
    children: n.children ? selectNodes(n.children, selected) : [],
    state: {
      ...n.state,
      selected,
    },
  }));

const nodeSelectionHandler = (nodes, updatedNode) =>
  nodes.map(node => {
    if (node.id === updatedNode.id) {
      return {
        ...updatedNode,
        children: node.children ? selectNodes(node.children, updatedNode.state.selected) : [],
      };
    }

    if (node.children) {
      return {...node, children: nodeSelectionHandler(node.children, updatedNode)};
    }

    return node;
  });

const toggleNodeVisibility = (nodes, expanded) =>
  nodes.map(n => ({
    ...n,
    children: n.children ? toggleNodeVisibility(n.children, expanded) : [],
    state: {
      ...n.state,
      expanded,
    },
  }));

const toggleAllChildrenVisibility = (nodes, updatedNode) =>
  nodes.map(node => {
    if (node.id === updatedNode.id) {
      const children = node.children ? toggleNodeVisibility(node.children, updatedNode.state.expanded) : [];

      return {
        ...updatedNode,
        children,
      };
    }

    return node;
  });

class Example extends React.Component {
  state = {
    nodes: Nodes,
  };

  handleChange = nodes => {
    this.setState({nodes});
  };

  render() {
    const {extensions} = this.props;
    return (
      <div data-testid="tree">
        <Tree nodes={this.state.nodes} onChange={this.handleChange} extensions={extensions}>
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
                <SelectionRender node={node} {...rest}>
                  {node.name}
                </SelectionRender>
              </Expandable>
            </div>
          )}
        </Tree>
      </div>
    );
  }
}

describe('Tree extensions', () => {
  afterEach(cleanup);

  describe('on mount', () => {
    test('should be able to plug in a new action', () => {
      // Render a tree that when selected selects all children.
      const {container, getByTestId} = render(
        <Example
          extensions={{
            updateTypeHandlers: {
              [SELECT]: nodeSelectionHandler,
            },
          }}
        />,
      );

      expect(container.querySelectorAll('input:checked').length).toBe(0);

      const {id} = EXPANDED_NODE_IN_ROOT;

      let targetExpandedNode = getByTestId(`${id}`);

      fireEvent.click(targetExpandedNode.querySelector('input'));

      // Number of visible children for the clicked node
      expect(container.querySelectorAll('input:checked').length).toBe(5);
    });

    test('should be able to override an existing action', () => {
      // Render a tree that when override the update function, expanding all children when a  node is expanded
      const {container, getByTestId} = render(
        <Example
          extensions={{
            updateTypeHandlers: {
              [constants.UPDATE_TYPE.UPDATE]: toggleAllChildrenVisibility,
            },
          }}
        />,
      );

      const diff = new NodeDiff(container);

      const {id} = COLLAPSED_NODE_IN_ROOT;
      const targetExpandedNode = getByTestId(`${id}`);

      fireEvent.click(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`));

      expect(diff.run(container)).toMatchInlineSnapshot(`
        Object {
          "changed": Array [
            "1",
          ],
          "mounted": Array [
            "6",
            "7",
            "8",
            "9",
          ],
          "unmounted": Array [],
        }
      `);
    });
  });

  describe('on update', () => {
    test('should be able to plug in a new action', () => {
      // Do an initial render without extensions.
      const {rerender, container, getByTestId} = render(<Example />);

      // Re-Render a tree that when selected selects all children.
      rerender(
        <Example
          extensions={{
            updateTypeHandlers: {
              [SELECT]: nodeSelectionHandler,
            },
          }}
        />,
      );

      expect(container.querySelectorAll('input:checked').length).toBe(0);

      const {id} = EXPANDED_NODE_IN_ROOT;

      let targetExpandedNode = getByTestId(`${id}`);

      fireEvent.click(targetExpandedNode.querySelector('input'));

      // Number of visible children for the clicked node
      expect(container.querySelectorAll('input:checked').length).toBe(5);
    });

    test('should be able to override an existing action', () => {
      // Do an initial render without extensions.
      const {rerender, container, getByTestId} = render(<Example />);

      // Render a tree that when override the update function, expanding all children when a  node is expanded
      rerender(
        <Example
          extensions={{
            updateTypeHandlers: {
              [constants.UPDATE_TYPE.UPDATE]: toggleAllChildrenVisibility,
            },
          }}
        />,
      );

      const diff = new NodeDiff(container);

      const {id} = COLLAPSED_NODE_IN_ROOT;
      const targetExpandedNode = getByTestId(`${id}`);

      fireEvent.click(targetExpandedNode.querySelector(`.${COLLAPSE_ICON_CN}`));

      expect(diff.run(container)).toMatchInlineSnapshot(`
        Object {
          "changed": Array [
            "1",
          ],
          "mounted": Array [
            "6",
            "7",
            "8",
            "9",
          ],
          "unmounted": Array [],
        }
      `);
    });
  });
});
