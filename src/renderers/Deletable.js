import React from 'react';
import classNames from 'classnames';

import { submitEvent } from '../eventWrappers';
import { getNodeRenderOptions, deleteNode } from '../selectors/nodes';

const Deletable = ({
  onChange,
  node,
  iconsClassNameMap = {
    delete: 'mi mi-delete',
  },
  children }) => {
  const { isDeletable } = getNodeRenderOptions(node);

  const className = classNames({
    [iconsClassNameMap.delete]: isDeletable,
  });
  
  const handleChange = () => onChange(deleteNode(node));
    
  return (
    <span>
      { isDeletable &&
        <i
          onKeyDown={submitEvent(handleChange)}
          onClick={handleChange}
          className={className}>
        </i> 
      }
      { children }
    </span>);
};

export default Deletable;