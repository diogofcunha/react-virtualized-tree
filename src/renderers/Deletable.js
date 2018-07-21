import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {submitEvent} from '../eventWrappers';
import {getNodeRenderOptions, deleteNode} from '../selectors/nodes';
import {Renderer} from '../shapes/rendererShapes';

const Deletable = ({
  onChange,
  node,
  iconsClassNameMap = {
    delete: 'mi mi-delete',
  },
  children,
}) => {
  const {isDeletable} = getNodeRenderOptions(node);

  const className = classNames({
    [iconsClassNameMap.delete]: isDeletable,
  });

  const handleChange = () => onChange(deleteNode(node));

  return (
    <span>
      {isDeletable && (
        <i tabIndex={0} onKeyDown={submitEvent(handleChange)} onClick={handleChange} className={className} />
      )}
      {children}
    </span>
  );
};

Deletable.propTypes = {
  ...Renderer,
  iconsClassNameMap: PropTypes.shape({
    delete: PropTypes.string,
  }),
};

export default Deletable;
