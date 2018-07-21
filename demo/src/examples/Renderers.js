import React, { Component } from 'react';
import classNames from 'classnames';

import Tree from '../../../src/TreeContainer';
import { Nodes } from '../../../testData/sampleTree';
import { createEntry } from '../toolbelt';

const Deepness = ({ node, children }) => {
  const deepness = node.deepness + 1;
  const className = classNames({
    [`mi mi-filter-${deepness}`]: deepness <= 9,
    'filter-9-plus': deepness > 9
  });
  
  return (
    <span>
      <i
        className={className}>
      </i>
      { children }
    </span>);
};

class Renderers extends Component {
  render() {
    return (
      <Tree nodes={Nodes}>
        {
          ({ node, ...rest }) =>
            <Deepness node={node} {...rest}>
              { node.name }
            </Deepness>
        }
      </Tree>
    );
  }
}

export default createEntry(
  'renderers',
  'Renderers',
  'Create a custom renderer',
  (
    <div>
      <p>A tree that makes use of a custom renderer</p>
    </div>
  ),
  Renderers
);
