jest.mock('react-virtualized');

import React from 'react';
import {render, cleanup, fireEvent} from 'react-testing-library';

import Tree from '../..';
import {Nodes} from '../../../testData/sampleTree';

class Example extends React.Component {
  state = {
    nodes: Nodes,
  };

  expandAllNodes = nodes => {
    return nodes.map(n => {
      let children;

      if (n.children) {
        children = this.expandAllNodes(n.children);
      }

      const state = n.state || {};

      return {
        ...n,
        children,
        state: {
          ...state,
          expanded: true,
        },
      };
    });
  };

  removePairRootPositionedNodes = () => {
    const nodes = this.state.nodes.filter((n, i) => i % 2 !== 0);

    this.setState({nodes});
  };

  render() {
    return (
      <div>
        <button
          data-testid="expand-all"
          onClick={() =>
            this.setState({
              nodes: this.expandAllNodes(this.state.nodes),
            })
          }
        />
        <button data-testid="remove-in-pair-root-pos" onClick={this.removePairRootPositionedNodes} />
        <div data-testid="tree">
          <Tree nodes={this.state.nodes}>
            {({style, node, ...rest}) => (
              <div style={style}>
                <span data-testid={`${node.id}`} data-haschildren={Boolean(node.children && node.children.length)}>
                  {node.name}
                </span>
              </div>
            )}
          </Tree>
        </div>
      </div>
    );
  }
}

describe('Tree rendering', () => {
  afterEach(cleanup);

  test('should render as expected on mount', () => {
    const {getByTestId} = render(<Example />);

    expect(getByTestId('tree')).toMatchSnapshot();
  });

  test('should render as expected on updates', () => {
    const {getByTestId} = render(<Example />);

    fireEvent.click(getByTestId('expand-all'));

    expect(getByTestId('tree')).toMatchSnapshot('all-expanded');

    fireEvent.click(getByTestId('remove-in-pair-root-pos'));

    expect(getByTestId('tree')).toMatchSnapshot('remove-in-pair-root-pos');
  });
});
