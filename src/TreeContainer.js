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
    this._flattenedTree = getFlattenedTree(props.nodes);
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

    if (nextProps.nodes !== this.props.nodes) {
      this._flattenedTree = getFlattenedTree(nextProps.nodes);
    }
  }

  handleChange = ({ node, type }) => {
    const updatedNodes = this.extensions.updateTypeHandlers[type](this.nodes, node);

    this.props.onChange(updatedNodes);
  }

  bulkChange = ({ type, setState }) => {
    const updatedNodes = this._flattenedTree.reduce((updatedNodes, n) => {
      return this.extensions.updateTypeHandlers[type](updatedNodes, { ...n, state: setState(n.state) })
    }, this.nodes);

    this.props.onChange(updatedNodes);
  }

  render() {
    return (
      <div className='tree'>
        { this.props.renderBulkActionButton &&
            this.props.renderBulkActionButton({
              onChange: this.bulkChange,
              nodes: this.props.nodes 
            }) 
        }
        <Tree
          nodes={this._flattenedTree}
          onChange={this.handleChange}
          NodeRenderer={this.props.children}
        />
      </div>
    );
  }
};

TreeContainer.propTypes = {
  renderBulkActionButton: PropTypes.func,
  extensions: PropTypes.shape({
    updateTypeHandlers: PropTypes.object
  }),
  nodes: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
  onChange: PropTypes.func,
  children: PropTypes.func.isRequired
};
