import React, { Component } from 'react';

import './App.css';
import Tree from '../../src/TreeContainer';
import Renderers from '../../src/renderers';
import { Nodes } from '../../testData/sampleTree';

const { Deletable, Expandable, Favorite } = Renderers;

export default class App extends Component {
  state = {
    nodes: Nodes
  }

  handleChange = (nodes) => {
    this.setState({ nodes });
  }

  render() {
    return (
      <div className="App">
        <Tree list={this.state.nodes} onChange={this.handleChange}>
          {
            ({ node, ...rest }) =>
              <Expandable node={node} {...rest}>
                { node.name }
                <Deletable node={node} {...rest}>
                  <Favorite node={node} {...rest}/>
                </Deletable>
              </Expandable>
          }
        </Tree>
      </div>
    );
  }
}
