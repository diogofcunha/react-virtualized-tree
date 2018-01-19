import React, { Component } from 'react';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import { createEntry } from '../toolbelt';

const MIN_NUMBER_OF_PARENTS = 300;
const MAX_NUMBER_OF_CHILDREN = 10;
const MAX_DEEPNESS = 4;

let ids = {};

const getUniqueId = () => {
  const candidateId = Math.round(Math.random() * 1000000);

  if (ids[candidateId]) {
    return getUniqueId();
  }

  ids[candidateId] = true;

  return candidateId;
}

const constructTree = (minNumOfNodes, deepness = 1) => {
  return new Array(minNumOfNodes).fill(deepness).map((si, i) => {
    const id = getUniqueId();
    const numberOfChildren = deepness === MAX_DEEPNESS ? 0 : Math.round(Math.random() * MAX_NUMBER_OF_CHILDREN);

    return {
      id,
      name: `Leaf ${id}`,
      children: numberOfChildren ? constructTree(numberOfChildren, deepness + 1) : [],
      state: {
        expanded: Boolean(Math.round(Math.random())),
        favorite: Boolean(Math.round(Math.random())),
        deletable: Boolean(Math.round(Math.random()))
      }
    };
  })
};

const { Deletable, Expandable, Favorite } = Renderers;

const Nodes = constructTree(MIN_NUMBER_OF_PARENTS);
const getTotalNumberOfElements = (nodes, counter = 0) => {
  return counter + nodes.length + nodes.reduce((acc, n) => getTotalNumberOfElements(n.children, acc) ,0)
}

const totalNumberOfNodes = getTotalNumberOfElements(Nodes);

class LargeCollection extends Component {
  state = {
    nodes: Nodes
  }

  handleChange = (nodes) => {
    this.setState({ nodes });
  }

  render() {
    return (
      <Tree nodes={this.state.nodes} onChange={this.handleChange}>
        {
          ({ node, ...rest }) =>
            <Expandable node={node} {...rest}>
              { node.name }
              <Deletable node={node} {...rest}>
                <Favorite node={node} {...rest}/>
              </Deletable>
            </Expandable>
        }
      </Tree>
    );
  }
}

export default createEntry(
  'large-collection',
  'LargeCollection',
  'Large Data Collection',
  (<div>
    <p>A tree that renders a large collection of nodes.</p>
    <p>This example is rendering a total of {totalNumberOfNodes} nodes</p>
  </div>),
  LargeCollection
);
