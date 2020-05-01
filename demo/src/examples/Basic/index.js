import React, {Component} from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import {Grid, Header, Label, Icon} from 'semantic-ui-react';
import update from 'immutability-helper';

import Tree from '../../../../src/TreeContainer';
import Renderers from '../../../../src/renderers';
import {Nodes} from '../../../../testData/sampleTree';
import {createEntry} from '../../toolbelt';
import RendererDragContainer from './RendererDragContainer';

const {Deletable, Expandable, Favorite} = Renderers;

const NodeNameRenderer = ({node: {name}, children}) => (
  <span>
    {name}
    {children}
  </span>
);

class BasicTree extends Component {
  state = {
    nodes: Nodes,
    availableRenderers: [Expandable, Deletable, Favorite],
    selectedRenderers: [Expandable, NodeNameRenderer],
    currentIndex: null,
  };

  treeRef = React.createRef();

  handleKeyDown = e => {
    e.preventDefault();
    const {startIndex, stopIndex} = this.treeRef.current;
    const length = stopIndex - startIndex + 1;
    if (e.keyCode === 38) {
      this.setState(prev => ({currentIndex: prev.currentIndex - 1 < 0 ? 0 : (prev.currentIndex - 1) % length}));
    } else if (e.keyCode === 40) {
      this.setState(prev => ({currentIndex: prev.currentIndex + 1}));
    } else if (e.keyCode === 32) {
      console.log(this.selectedNode);
    }
  };

  handleRendererMove = (dragIndex, hoverIndex) => {
    const {selectedRenderers} = this.state;
    const dragCard = selectedRenderers[dragIndex];

    this.setState(
      update(this.state, {
        selectedRenderers: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    );
  };

  handleChange = nodes => {
    this.setState({nodes});
  };

  renderNodeDisplay = (display, props, children = []) => React.createElement(display, props, children);

  createNodeRenderer = (nodeDisplay = this.state.nodeDisplay, props) => {
    const [nextNode, ...remainingNodes] = nodeDisplay;

    if (remainingNodes.length === 0) {
      return this.renderNodeDisplay(nextNode, props);
    }

    return this.renderNodeDisplay(nextNode, props, this.createNodeRenderer(remainingNodes, props));
  };

  getRenderedComponentTree = () =>
    reactElementToJSXString(this.createNodeRenderer(this.state.selectedRenderers, {node: {name: 'X', id: 0}}))
      .split('>')
      .filter(c => c)
      .map((c, i) => {
        const {
          selectedRenderers: {length},
        } = this.state;
        const isClosingTag = i >= length;

        const marginLeft = !isClosingTag ? 10 * i : 10 * (length - 2 - Math.abs(length - i));

        return <div style={{marginLeft}}>{c}></div>;
      });

  handleRendererDeselection = i => () => {
    this.setState(({selectedRenderers}) => ({
      selectedRenderers: [...selectedRenderers.slice(0, i), ...selectedRenderers.slice(i + 1)],
    }));
  };

  handleRendererSelection = renderer => () => {
    this.setState(({selectedRenderers}) => ({
      selectedRenderers: [...selectedRenderers, renderer],
    }));
  };

  getStyle = (style, p) => {
    if (p.index === this.state.currentIndex) {
      this.selectedNode = p.node;
    }
    return {...style, border: p.index === this.state.currentIndex ? 'solid 1px black' : ''};
  };

  render() {
    if (this.treeRef.current) {
      console.log(this.treeRef.current.startIndex, this.treeRef.current.stopIndex, this.state.currentIndex);
    }
    const renderersAvailableForAdd = this.state.availableRenderers.filter(
      r => this.state.selectedRenderers.indexOf(r) === -1,
    );

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Header as="h4">Available Renderers</Header>

            <Label.Group color="blue">
              {renderersAvailableForAdd.map((r, i) => {
                return (
                  <Label as="a">
                    {r.name}
                    <Icon name="plus" onClick={this.handleRendererSelection(r)} style={{marginLeft: 3}} />
                  </Label>
                );
              })}
            </Label.Group>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4">Ouput tree</Header>
            <div tabIndex={-1} onKeyDown={this.handleKeyDown} style={{height: 200}}>
              <Tree
                scrollToIndex={this.state.currentIndex}
                ref={this.treeRef}
                scrollToAlignment="end"
                nodes={this.state.nodes}
                onChange={this.handleChange}
              >
                {({style, ...p}) => (
                  <div style={this.getStyle(style, p)}>{this.createNodeRenderer(this.state.selectedRenderers, p)}</div>
                )}
              </Tree>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h4">Node renderer builder</Header>

            <Label.Group color="blue">
              <RendererDragContainer
                selectedRenderers={this.state.selectedRenderers}
                moveRenderer={this.handleRendererMove}
                handleRendererDeselection={this.handleRendererDeselection}
              />
            </Label.Group>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4">JSX</Header>

            {this.getRenderedComponentTree()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default createEntry(
  'basic-tree',
  'Basic/index',
  'Basic Tree',
  <div>
    <p>
      A tree that enables favorite toogle, expansion and deletion, this example only makes use of the default renderers
    </p>
  </div>,
  BasicTree,
);
