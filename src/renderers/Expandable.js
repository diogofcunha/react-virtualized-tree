import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { submitEvent } from '../eventWrappers';
import { getNodeRenderOptions, udpateNode } from '../selectors/nodes';
import { Renderer } from '../shapes/rendererShapes';

const Expandable = ({
  onChange,
  node,
  children,
  iconsClassNameMap = {
    expanded: 'mi mi-keyboard-arrow-down',
    collapsed: 'mi mi-keyboard-arrow-right',
    lastChild: ''
  }
  }) => {
  const { hasChildren, isExpanded } = getNodeRenderOptions(node);
  const className = classNames({
    [iconsClassNameMap.expanded]: hasChildren && isExpanded,
    [iconsClassNameMap.collapsed]: hasChildren && !isExpanded,
    [iconsClassNameMap.lastChild]: !hasChildren  
  });

  const handleChange = () => onChange(udpateNode(node, { expanded: !isExpanded }));
  
  return (
    <span onDoubleClick={handleChange}>
      <i
        tabIndex={0}
        id={node.id}
        onKeyDown={submitEvent(handleChange)}
        onClick={handleChange}
        className={className}>
      </i>
      { children }
    </span>);
};

Expandable.propTypes = {
  ...Renderer,
  iconsClassNameMap: PropTypes.shape({
    expanded: PropTypes.string,
    collapsed: PropTypes.string,
    lastChild: PropTypes.string
  })
}

export default Expandable;