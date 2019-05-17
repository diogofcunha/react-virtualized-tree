jest.mock('react-virtualized');

import React from 'react';
import {render, cleanup, fireEvent} from 'react-testing-library';

import Tree, {renderers} from '..';
import {
  Nodes,
  EXPANDED_NODE_IN_ROOT,
  EXPANDED_CHILDREN,
  COLLAPSED_NODE_IN_ROOT,
  COLLAPSED_CHILDREN,
} from '../../testData/sampleTree';

const {Expandable, Deletable, Favorite} = renderers;

const EXPAND_ICON_CN = 'EXPAND';
const COLLAPSE_ICON_CN = 'COLLAPSE';

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
          <div style={style} data-testid={node.id}>
            <Expandable
              node={node}
              {...rest}
              iconsClassNameMap={{
                expanded: EXPAND_ICON_CN,
                collapsed: COLLAPSE_ICON_CN,
              }}
            >
              {node.name}
              <Deletable node={node} {...rest}>
                <Favorite node={node} {...rest} />
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
    test('should be able to collapse a node in the root', () => {
      const {getByTestId} = render(<Example />);

      const {id, children} = EXPANDED_NODE_IN_ROOT;

      let renderedNode = getByTestId(`${id}`);
      expect(renderedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).toBeNull();
      children.forEach(c => {
        expect(getByTestId(`${c.id}`)).toBeDefined();
      });

      // Collapse node by clicking the expand icon.
      const collapsedNode = renderedNode.querySelector(`.${EXPAND_ICON_CN}`);
      fireEvent.click(collapsedNode);

      // Children should now disappear and icon should change.
      children.forEach(c => {
        expect(() => getByTestId(`${c.id}`)).toThrow();
      });

      renderedNode = getByTestId(`${id}`);
      expect(renderedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).not.toBeNull();
      expect(renderedNode.querySelector(`.${EXPAND_ICON_CN}`)).toBeNull();
    });

    test('should be able to collapse a node deep', () => {
      const {getByTestId} = render(<Example />);

      const {id, children} = EXPANDED_CHILDREN;

      let renderedNode = getByTestId(`${id}`);
      expect(renderedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).toBeNull();
      children.forEach(c => {
        expect(getByTestId(`${c.id}`)).toBeDefined();
      });

      // Collapse node by clicking the expand icon.
      const collapsedNode = renderedNode.querySelector(`.${EXPAND_ICON_CN}`);
      fireEvent.click(collapsedNode);

      // Children should now disappear and icon should change.
      children.forEach(c => {
        expect(() => getByTestId(`${c.id}`)).toThrow();
      });

      renderedNode = getByTestId(`${id}`);
      expect(renderedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).not.toBeNull();
      expect(renderedNode.querySelector(`.${EXPAND_ICON_CN}`)).toBeNull();
    });

    test('should be able to expand a node in the root', () => {
      const {getByTestId} = render(<Example />);

      const {id, children} = COLLAPSED_NODE_IN_ROOT;

      let renderedNode = getByTestId(`${id}`);
      expect(renderedNode.querySelector(`.${EXPAND_ICON_CN}`)).toBeNull();
      children.forEach(c => {
        expect(() => getByTestId(`${c.id}`)).toThrow();
      });

      // Expand node by clicking the collapse icon.
      const collapsedNode = renderedNode.querySelector(`.${COLLAPSE_ICON_CN}`);
      fireEvent.click(collapsedNode);

      // Children should now appear and icon should change.
      children.forEach(c => {
        expect(getByTestId(`${c.id}`)).toBeDefined();
      });

      renderedNode = getByTestId(`${id}`);
      expect(renderedNode.querySelector(`.${EXPAND_ICON_CN}`)).not.toBeNull();
      expect(renderedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).toBeNull();
    });

    test('should be able to expand a node deep', () => {
      const {getByTestId} = render(<Example />);

      const {id, children} = COLLAPSED_CHILDREN;

      let renderedNode = getByTestId(`${id}`);
      expect(renderedNode.querySelector(`.${EXPAND_ICON_CN}`)).toBeNull();
      children.forEach(c => {
        expect(() => getByTestId(`${c.id}`)).toThrow();
      });

      // Expand node by clicking the collapse icon.
      const collapsedNode = renderedNode.querySelector(`.${COLLAPSE_ICON_CN}`);
      fireEvent.click(collapsedNode);

      // Children should now appear and icon should change.
      children.forEach(c => {
        expect(getByTestId(`${c.id}`)).toBeDefined();
      });

      renderedNode = getByTestId(`${id}`);
      expect(renderedNode.querySelector(`.${EXPAND_ICON_CN}`)).not.toBeNull();
      expect(renderedNode.querySelector(`.${COLLAPSE_ICON_CN}`)).toBeNull();
    });
  });
});
