export const isNodeExpanded = node => node.state && node.state.expanded;
export const nodeHasChildren = node => node.children && node.children.length;

export const getFlattenedTree = (nodes, parents = []) => {
  const flattenedTree = [];
  const flattenNodes = [];

  for (const node of nodes) {
    flattenNodes.push({node, parents});
  }

  while (flattenNodes.length > 0) {
    const {node, parents} = flattenNodes.pop();

    const deepness = parents.length;
    const nodeWithHelpers = {...node, deepness, parents};

    flattenedTree.push(nodeWithHelpers);

    if (nodeHasChildren(node) && isNodeExpanded(node)) {
      const childParents = [...parents, node.id];

      for (let i = node.children.length - 1; i >= 0; i--) {
        flattenNodes.push({node: node.children[i], parents: childParents});
      }
    }
  }

  return flattenedTree;
};

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
