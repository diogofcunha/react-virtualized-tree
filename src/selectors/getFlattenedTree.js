const isNodeExpanded = node => node.state && node.state.expanded;
const nodeHasChildren = node => node.children && node.children.length;

export const getFlattenedTree = (nodes, parents = []) =>
  nodes.reduce((flattenedTree, node) => {
    const deepness = parents.length;
    const nodeWithHelpers = {...node, deepness, parents};

    if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
      return [...flattenedTree, nodeWithHelpers];
    }

    return [...flattenedTree, nodeWithHelpers, ...getFlattenedTree(node.children, [...parents, node.id])];
  }, []);
