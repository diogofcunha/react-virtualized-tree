import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { submitEvent } from '../eventWrappers';
import { getTreeState } from '../selectors/nodes';
import { COLLECTION_MATCH } from '../contants';
import { Node } from '../shapes/nodeShapes';

export const DEFAULT_CLASS_NAMES = {
  favorite: {
    [COLLECTION_MATCH.All]: 'mi mi-star',
    [COLLECTION_MATCH.None]: 'mi mi-star-border',
    [COLLECTION_MATCH.Some]: 'mi mi-star-half'
  },
  expanded: {
    [COLLECTION_MATCH.All]: 'mi mi-keyboard-arrow-right',
    [COLLECTION_MATCH.None]: 'mi mi-keyboard-arrow-down',
    [COLLECTION_MATCH.Some]: 'mi mi-keyboard-arrow-down'
  }
};

export const DEFAULT_STATE_KEYS = [ 'favorite', 'expanded' ];

const BulkAction = ({
  onChange,
  nodes,
  stateKeys = DEFAULT_STATE_KEYS,
  iconsClassNameMap = DEFAULT_CLASS_NAMES
 }) => {
  const treeState = getTreeState(nodes, stateKeys);

  const icons = Object.keys(treeState)
    .map(iconName => <i
      key={`bulk-${iconName}`}
      className={iconsClassNameMap[iconName][treeState[iconName]]}
      tabIndex={0} />
    );
  
  return (
    <div className='bulk-action'>
      All 
      <span className='bulk-action-icon-group'>{ icons }</span>
    </div>);
};

BulkAction.propTypes = {
  onChange: PropTypes.func.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
  stateKeys: PropTypes.arrayOf(PropTypes.string),
  iconsClassNameMap: PropTypes.object
}

export default BulkAction;