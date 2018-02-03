import React from 'react';
import PropTypes from 'prop-types';

import Tree from './Tree';
import DraggingContainer from './DraggingContainer';
import { UPDATE_TYPE } from './contants';
import { getFlattenedTree } from './selectors/getFlattenedTree';
import { deleteNodeFromTree, replaceNodeFromTree, moveNodeFromTree } from './selectors/nodes';
import { Node } from './shapes/nodeShapes';

const DEFAULT_UPDATE_TYPES = {
  [UPDATE_TYPE.DELETE]: deleteNodeFromTree,
  [UPDATE_TYPE.UPDATE]: replaceNodeFromTree,
  [UPDATE_TYPE.MOVE]: moveNodeFromTree
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

  getContainer = () => !this.props.draggable ?
    { Container: 'div', props: {} } : 
    { Container: DraggingContainer, props: { onChange: this.handleChange } }

  render() {
    const { children, nodes } = this.props;
    const { Container, props } = this.getContainer();

    return (
      <Container {...props}>
        <Tree nodes={getFlattenedTree(nodes)} onChange={this.handleChange}> 
          { children }
        </Tree>
      </Container>
    );
  }
};

TreeContainer.propTypes = {
  extensions: PropTypes.shape({
    updateTypeHandlers: PropTypes.object
  }),
  nodes: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
  onChange: PropTypes.func,
  draggable: PropTypes.bool,
  children: PropTypes.func.isRequired
};
