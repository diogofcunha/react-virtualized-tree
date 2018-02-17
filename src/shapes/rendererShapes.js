import PropTypes from 'prop-types';

import { FlattenedNode } from './nodeShapes';

export const Renderer = {
  measure: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  node: PropTypes.shape(FlattenedNode)
};
