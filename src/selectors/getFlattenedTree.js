export const isNodeExpanded = node => node.state && node.state.expanded;
export const nodeHasChildren = node => node.children && node.children.length;

export const getFlattenedTree = (nodes, parents = []) =>
  nodes.reduce((flattenedTree, node) => {
    const deepness = parents.length;
    const nodeWithHelpers = {...node, deepness, parents};

    if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
      return [...flattenedTree, nodeWithHelpers];
    }

    return [...flattenedTree, nodeWithHelpers, ...getFlattenedTree(node.children, [...parents, node.id])];
  }, []);

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
