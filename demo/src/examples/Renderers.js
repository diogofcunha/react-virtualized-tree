import React, { Component } from 'react';
import classNames from 'classnames';

import Tree from '../../../src/TreeContainer';
import { Nodes } from '../../../testData/sampleTree';

const Deepness = ({ node, children }) => {
  const deepness = node.deepness + 1;
  const className = classNames({
    [`mi mi-filter-${deepness}`]: deepness <= 9,
    'filter-9-plus': deepness > 9
  });
  
  return (
    <span>
      <i
        id={node.id}
        className={className}>
      </i>
      { children }
    </span>);
};

export default class BasicTree extends Component {
  render() {
    return (
      <Tree list={Nodes}>
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
