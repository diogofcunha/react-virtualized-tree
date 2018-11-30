import React, {Component} from 'react';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import {createEntry, constructTree} from '../toolbelt';
import {InfiniteLoader as RVInfiniteLoader} from 'react-virtualized';

const {Expandable} = Renderers;

class InfiniteLoader extends Component {
  state = {
    nodes: constructTree(4, 10, 10),
  };

  lastLoadingIndex = 10;

  handleChange = nodes => {
    this.setState({nodes});
  };

  isRowLoaded = ({index}) => {
    const {nodes} = this.state;

    return Boolean(nodes[index]) || index <= this.lastLoadingIndex;
  };

  loadMoreRows = async ({startIndex, stopIndex}) => {
    this.lastLoadingIndex = stopIndex;

    return new Promise(resolve => {
      const nodes = constructTree(3, 5, 4);

      setTimeout(() => {
        this.setState(state => ({
          nodes: state.nodes.concat(nodes),
        }));

        resolve(nodes);
      }, 2000);
    });
  };

  render() {
    return (
      <RVInfiniteLoader isRowLoaded={this.isRowLoaded} loadMoreRows={this.loadMoreRows} rowCount={7000}>
        {({onRowsRendered, registerChild}) => (
          <Tree
            nodes={this.state.nodes}
            onChange={this.handleChange}
            onRowsRendered={onRowsRendered}
            registerChild={registerChild}
            rowCount={7000}
          >
            {({node, ...rest}) =>
              node.id ? (
                <Expandable node={node} {...rest}>
                  {node.name}
                </Expandable>
              ) : (
                <div
                  style={{
                    padding: 3,
                    boxSizing: 'border-box',
                    height: 20,
                    width: '100%',
                  }}
                >
                  <div style={{backgroundColor: 'lightgrey', height: 15}} />
                </div>
              )
            }
          </Tree>
        )}
      </RVInfiniteLoader>
    );
  }
}

export default createEntry(
  'infinite-loader',
  'InfiniteLoader',
  'Infinite Loader',
  <div>
    <p>A tree that renders a large collection of nodes. Using react-virtualized's InfiniteLoader</p>
  </div>,
  InfiniteLoader,
);
