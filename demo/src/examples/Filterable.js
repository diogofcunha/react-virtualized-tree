import React, {Component} from 'react';
import classNames from 'classnames';
import {Checkbox} from 'semantic-ui-react';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import {createEntry, constructTree} from '../toolbelt';
import FilteringContainer from '../../../src/FilteringContainer';
import Favorite from '../../../src/renderers/Favorite';

const {Expandable} = Renderers;

const MAX_DEEPNESS = 3;
const MAX_NUMBER_OF_CHILDREN = 4;
const MIN_NUMBER_OF_PARENTS = 5;

const Nodes = constructTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN, MIN_NUMBER_OF_PARENTS);

const EXPANDED = 'EXPANDED';

class Filterable extends Component {
  state = {
    nodes: Nodes,
    selectedGroup: EXPANDED,
    groupsEnabled: true,
  };

  get _groupProps() {
    return this.state.groupsEnabled
      ? {
          groups: {
            ALL: {
              name: 'All',
              filter: node => true,
            },
            [EXPANDED]: {
              name: 'Expanded',
              filter: node => (node.state || {}).expanded,
            },
            FAVORITES: {
              name: 'Favorites',
              filter: node => (node.state || {}).favorite,
            },
          },
          selectedGroup: this.state.selectedGroup,
          onSelectedGroupChange: this.handleSelectedGroupChange,
        }
      : {};
  }

  handleChange = nodes => {
    this.setState({nodes});
  };

  handleSelectedGroupChange = selectedGroup => {
    this.setState({selectedGroup});
  };

  handleGroupsToogle = () => {
    this.setState({groupsEnabled: !this.state.groupsEnabled});
  };

  render() {
    return (
      <div>
        <Checkbox
          toggle
          label="Use groups"
          checked={this.state.groupsEnabled}
          onChange={this.handleGroupsToogle}
          style={{marginBottom: 15}}
        />
        <FilteringContainer nodes={this.state.nodes} {...this._groupProps}>
          {({nodes}) => (
            <div style={{height: 500}}>
              <Tree nodes={nodes} onChange={this.handleChange}>
                {({style, node, ...rest}) => (
                  <div style={style}>
                    <Expandable node={node} {...rest}>
                      <Favorite node={node} {...rest}>
                        {node.name}
                      </Favorite>
                    </Expandable>
                  </div>
                )}
              </Tree>
            </div>
          )}
        </FilteringContainer>
      </div>
    );
  }
}

export default createEntry(
  'filterable',
  'Filterable',
  'Filterable tree',
  <div>
    <p>When working with big data collections filtering can be very handy.</p>

    <p>
      By wrapping the Tree with the <code>FilteringContainer</code> your tree will only recieve the nodes it needs to
      render.
    </p>
  </div>,
  Filterable,
);
