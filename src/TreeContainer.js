import React from 'react';
import PropTypes from 'prop-types';

import Tree from './Tree';
import { UPDATE_TYPE } from './contants';
import { getFlattenedTree } from './selectors/getFlattenedTree';
import { deleteNodeFromTree, replaceNodeFromTree } from './selectors/nodes';
import { Node } from './shapes/nodeShapes';

const DEFAULT_UPDATE_TYPES = {
  [UPDATE_TYPE.DELETE]: deleteNodeFromTree,
  [UPDATE_TYPE.UPDATE]: replaceNodeFromTree
};

export default class TreeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.extensions = props;
  }

  static contextTypes = {
    unfilteredNodes: PropTypes.arrayOf(PropTypes.shape(Node))
  };

  get extensions() {
    return this._extensions;
  }

  set extensions(props) {
    const {
      extensions: {
        updateTypeHandlers = { }
      } = { }
    } = props;

    this._extensions = {
      updateTypeHandlers: {
        ...DEFAULT_UPDATE_TYPES,
        ...updateTypeHandlers
      }
    }
  }

  get nodes() {
    return this.context.unfilteredNodes || this.props.nodes;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.extensions !== this.props.extensions) {
      this.extensions = nextProps;
    }
  }

  handleChange = ({ node, type }) => {
    const updatedNodes = this.extensions.updateTypeHandlers[type](this.nodes, node);

    this.props.onChange(updatedNodes);
  }

  render() {
    return (
      <Tree leftMarginAmount={this.props.nodeMarginLeft} nodes={getFlattenedTree(this.props.nodes)} onChange={this.handleChange}>
        { this.props.children }
      </Tree>
    );
  }
};

TreeContainer.propTypes = {
  extensions: PropTypes.shape({
    updateTypeHandlers: PropTypes.object
  }),
  nodes: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
  onChange: PropTypes.func,
  children: PropTypes.func.isRequired,
  nodeMarginLeft: PropTypes.number
};

TreeContainer.defaultProps = {
  nodeMarginLeft: 30
};
