import PropTypes from 'prop-types';

import { FlattenedNode } from './nodeShapes';

export const Renderer = {
  onChange: PropTypes.func.isRequired,
  node: PropTypes.shape(FlattenedNode)
};
