import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const nameMatchesSearchTerm = (name, searchTerm) => {
  const upperCaseName = name.toUpperCase();
  const upperCaseSearchTerm = searchTerm.toUpperCase();

  return upperCaseName.indexOf(upperCaseSearchTerm.trim()) > -1
}

const filterNodes = (searchTerm, nodes) => nodes.reduce((nds, n) => {
  let filteredChildren = [];

  if (n.children) {
    filteredChildren = filterNodes(searchTerm, n.children);
  }

  if (nameMatchesSearchTerm(n.name, searchTerm) || filteredChildren.length) {
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
    debouncer: debounce
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

  render() {
    const { filterTerm, filterText } = this.state;
    const filteredNodes = filterTerm ? filterNodes(filterTerm, this.props.nodes) : this.props.nodes;

    return (
      <div className="tree-filter-container">
        <div className="tree-lookup-input">
          <input
            value={filterText}
            onChange={this.handleFilterTextChange}
            placeholder="Search..."/>
          <i aria-hidden="true" class="mi mi-11 mi-search"></i>
        </div>
        { this.props.children({ nodes: filteredNodes }) }
      </div>
    )
  }
}

FilteringContainer.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  debouncer: PropTypes.func
}