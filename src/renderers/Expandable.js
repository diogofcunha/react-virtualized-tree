import React from 'react';
import classNames from 'classnames';

import { submitEvent } from '../eventWrappers';
import { getNodeRenderOptions, udpateNode } from '../selectors/nodes';

const Expandable = ({
  onChange,
  node,
  children,
  iconsClassNameMap = {
    expanded: 'mi mi-keyboard-arrow-down',
    collapsed: 'mi mi-keyboard-arrow-right' 
  }
  }) => {
  const { hasChildren, isExpanded } = getNodeRenderOptions(node);
  const className = classNames({
    [iconsClassNameMap.expanded]: hasChildren && isExpanded,
    [iconsClassNameMap.collapsed]: hasChildren && !isExpanded
  });

  const handleChange = () => onChange(udpateNode(node, { expanded: !isExpanded }));
  
  return (
    <span>
      <i
        id={node.id}
        onKeyDown={submitEvent(handleChange)}
        onClick={handleChange}
        className={className}>
      </i>
      { children }
    </span>);
};

export default Expandable;