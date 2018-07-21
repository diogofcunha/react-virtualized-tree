import PropTypes from 'prop-types';

import {FlattenedNode} from './nodeShapes';

export const Renderer = {
  measure: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  node: PropTypes.shape(FlattenedNode),
};
