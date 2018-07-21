import PropTypes from 'prop-types';

export const NodeState = {
  expanded: PropTypes.bool,
  deletable: PropTypes.bool,
  favorite: PropTypes.bool,
};

const BasicNode = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string,
  state: PropTypes.shape(NodeState),
};

export const Node = {
  ...BasicNode,
};

Node.children = PropTypes.arrayOf(PropTypes.shape(Node));

export const FlattenedNode = {
  ...BasicNode,
  deepness: PropTypes.number.isRequired,
  parents: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};
