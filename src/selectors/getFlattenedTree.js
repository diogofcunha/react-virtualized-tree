export const isNodeExpanded = node => node.state && node.state.expanded;
export const nodeHasChildren = node => node.children && node.children.length;

export const getFlattenedTree = (nodes, parents = []) => {
  const flattenedTree = [];
  const stack = [...nodes.map(node => ({node, parents}))];

  while (stack.length > 0) {
    const {node, parents} = stack.shift();
    const deepness = parents.length;
    const nodeWithHelpers = {...node, deepness, parents};

    if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
      flattenedTree.push(nodeWithHelpers);
    } else {
      flattenedTree.push(nodeWithHelpers);
      stack.unshift(...node.children.map(child => ({node: child, parents: [...parents, node.id]})));
    }
  }

  return flattenedTree;
};

export const getFlattenedTreePaths = (nodes, parents = []) => {
  const paths = [];
  const stack = [...nodes.map(node => ({node, parents}))];

  while (stack.length > 0) {
    const {node, parents} = stack.shift();
    const {id} = node;

    if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
      paths.push([...parents, id]);
    } else {
      paths.push([...parents, id]);
      stack.unshift(...node.children.map(child => ({node: child, parents: [...parents, id]})));
    }
  }
  return paths;
};

export const doesChangeAffectFlattenedTree = (previousNode, nextNode) => {
  return isNodeExpanded(previousNode) !== isNodeExpanded(nextNode);
};
