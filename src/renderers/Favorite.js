import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {submitEvent} from '../eventWrappers';
import {getNodeRenderOptions, updateNode} from '../selectors/nodes';
import {Renderer} from '../shapes/rendererShapes';

const Favorite = ({
  onChange,
  node,
  iconsClassNameMap = {
    favorite: 'mi mi-star',
    notFavorite: 'mi mi-star-border',
  },
  children,
  index,
}) => {
  const {isFavorite} = getNodeRenderOptions(node);

  const className = classNames({
    [iconsClassNameMap.favorite]: isFavorite,
    [iconsClassNameMap.notFavorite]: !isFavorite,
  });

  const handleChange = () => onChange({...updateNode(node, {favorite: !isFavorite}), index});

  return (
    <span>
      <i tabIndex={0} onKeyDown={submitEvent(handleChange)} onClick={handleChange} className={className} />
      {children}
    </span>
  );
};

Favorite.propTypes = {
  ...Renderer,
  iconsClassNameMap: PropTypes.shape({
    favorite: PropTypes.string,
    notFavorite: PropTypes.string,
  }),
};

export default Favorite;
