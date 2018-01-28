import React, { Component } from 'react';
import classNames from 'classnames';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import { createEntry, constructTree } from '../toolbelt';
import FilteringContainer from '../../../src/FilteringContainer';

const { Expandable } = Renderers;

const MAX_DEEPNESS = 3;
const MAX_NUMBER_OF_CHILDREN = 4;
const MIN_NUMBER_OF_PARENTS = 5;

const Nodes = constructTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN, MIN_NUMBER_OF_PARENTS);

class Filterable extends Component {
  state = {
    nodes: Nodes
  }

  handleChange = (nodes) => {
    this.setState({ nodes });
  }

  render() {
    return (
      <FilteringContainer nodes={this.state.nodes}>
        {
          ({ nodes }) => <div style={{ height: 500 }}>
            <Tree
              nodes={nodes}
              onChange={this.handleChange}
            >
            {
              ({ node, ...rest }) =>
                <Expandable node={node} {...rest} >
                  { node.name }
                </Expandable>
            }
            </Tree>
          </div>
        }
      </FilteringContainer>
    );
  }
}

export default createEntry(
  'filterable',
  'Filterable',
  'Filterable tree',
  (<div>
    <p>When working with big data collections filtering can be very handy.</p>
    
    <p>By wrapping the Tree with the <code>FilteringContainer</code> your tree will only recieve the nodes it needs to render.</p>
  </div>),
  Filterable
);
