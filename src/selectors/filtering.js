const INITIAL_FILTERED_VALUE = {nodes: [], nodeParentMappings: {}};

export const filterNodes = (filter, nodes, parents = []) =>
  nodes.reduce((filtered, n) => {
    const {nodes: filteredChildren, nodeParentMappings: childrenNodeMappings} = n.children
      ? filterNodes(filter, n.children, [...parents, n.id])
      : INITIAL_FILTERED_VALUE;

    return !(filter(n) || filteredChildren.length)
      ? filtered
      : {
          nodes: [
            ...filtered.nodes,
            {
              ...n,
              children: filteredChildren,
            },
          ],
          nodeParentMappings: {
            ...filtered.nodeParentMappings,
            ...childrenNodeMappings,
            [n.id]: parents,
          },
        };
  }, INITIAL_FILTERED_VALUE);
