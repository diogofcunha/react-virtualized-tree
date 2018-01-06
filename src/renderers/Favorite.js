import React from 'react';
import classNames from 'classnames';

import { submitEvent } from '../eventWrappers';
import { getNodeRenderOptions, udpateNode } from '../selectors/nodes';

const Favorite = ({
  onChange,
  node,
  iconsClassNameMap = { 
    favorite: 'mi mi-star',
    notFavorite: 'mi mi-star-border'
  },
  children }) => {
  const { isFavorite } = getNodeRenderOptions(node); 

  const className = classNames({
    [iconsClassNameMap.favorite]: isFavorite,
    [iconsClassNameMap.notFavorite]: !isFavorite,
  });

  const handleChange = () => onChange(udpateNode(node, { favorite: !isFavorite }));
  
  return (
    <span>
      <i
        onKeyDown={submitEvent(handleChange)}
        onClick={handleChange}
        className={className}>
      </i>
      { children }
    </span>);
};

export default Favorite;