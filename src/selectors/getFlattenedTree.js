export const isNodeExpanded = node => node.state && node.state.expanded;
export const nodeHasChildren = node => node.children && node.children.length;

export const getFlattenedTree = (nodes, parents = []) => {
  const result = [];
  const flattenNodes = [];
  // add in reverse order
  for (let i = nodes.length - 1; i >= 0; i--) {
    flattenNodes.push({
      node: nodes[i],
      parents,
    });
  }

  while (flattenNodes.length > 0) {
    const { node, parents } = flattenNodes.pop();
    // add node with helpers
    result.push({
      ...node,
      deepness: parents.length,
      parents,
    });

    if (nodeHasChildren(node) && isNodeExpanded(node)) {
      const childParents = [...parents, node.id];
      // add all children in reverse order
      for (let i = node.children.length - 1; i >= 0; i--) {
        flattenNodes.push({
          node: node.children[i],
          parents: childParents,
        });
      }
    }
  }
  return result;
}

export const getFlattenedTreePaths = (nodes, parents = []) => {
  const paths = [];

  for (const node of nodes) {
    const {id} = node;

    if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
      paths.push(parents.concat(id));
    } else {
      paths.push(parents.concat(id));
      paths.push(...getFlattenedTreePaths(node.children, [...parents, id]));
    }
  }

  return paths;
};

export const doesChangeAffectFlattenedTree = (previousNode, nextNode) => {
  return isNodeExpanded(previousNode) !== isNodeExpanded(nextNode);
};
