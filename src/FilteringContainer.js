import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import classNames from 'classnames';

import DefaultGroupRenderer from './filtering/DefaultGroupRenderer';

const nameMatchesSearchTerm = (searchTerm) => ({ name }) => {
  const upperCaseName = name.toUpperCase();
  const upperCaseSearchTerm = searchTerm.toUpperCase();

  return upperCaseName.indexOf(upperCaseSearchTerm.trim()) > -1
}

const filterNodes = (filter, nodes) => nodes.reduce((nds, n) => {
  let filteredChildren = [];

  if (n.children) {
    filteredChildren = filterNodes(filter, n.children);
  }

  if (filter(n) || filteredChildren.length) {
    return [
      ...nds,
      {
        ...n,
        children: filteredChildren
      }
    ];
  }

  return [ ...nds ];
}, []);

export default class FilteringContainer extends React.Component {
  state = {
    filterText: '',
    filterTerm: ''
  }

  static defaultProps = {
    debouncer: debounce,
    groupRenderer: DefaultGroupRenderer
  }

  constructor(props) {
    super(props);

    this.setFilterTerm = props.debouncer(this.setFilterTerm, 300);
  }

  setFilterTerm() {
    this.setState(ps => ({ filterTerm: ps.filterText }));
  }

  handleFilterTextChange = e => {
    const filterText = e.target.value;

    this.setState({ filterText });

    this.setFilterTerm();
  }

  handleSelectedGroupChange = g => {
    this.props.onSelectedGroupChange(g);
  }

  render() {
    const { filterTerm, filterText } = this.state;
    const {
      nodes,
      children: treeRenderer,
      groups,
      selectedGroup,
      groupRenderer: GroupRenderer,
      onSelectedGroupChange } = this.props;

    const relevantNodes = groups && selectedGroup && groups[selectedGroup] ? 
      filterNodes(groups[selectedGroup].filter, nodes) :
      nodes;
      
    const filteredNodes = filterTerm ?
      filterNodes(nameMatchesSearchTerm(filterTerm), relevantNodes) :
      relevantNodes;

    return (
      <div className="tree-filter-container">
        <div className={classNames('tree-lookup-input', { group: !!groups })}>
          <input
            value={filterText}
            onChange={this.handleFilterTextChange}
            placeholder="Search..."/>
          <i aria-hidden="true" className="mi mi-11 mi-search"></i>
          { groups && 
            <GroupRenderer
              groups={groups}
              selectedGroup={selectedGroup}
              onChange={onSelectedGroupChange}
            /> 
          }
        </div>
        { treeRenderer({ nodes: filteredNodes }) }
      </div>
    )
  }
}

FilteringContainer.propTypes = {
  children: PropTypes.func.isRequired,
  debouncer: PropTypes.func,
  groups: PropTypes.object,
  selectedGroup: PropTypes.string,
  groupRenderer: PropTypes.func,
  onSelectedGroupChange: PropTypes.func
}