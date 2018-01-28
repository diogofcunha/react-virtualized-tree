import React from 'react';
import PropTypes from 'prop-types';

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
  constructor(props) {
    super(props);
    this.handleFilterTermChange = this.handleFilterTermChange.bind(this);

    this.state = {
      filterText: '',
      filteredNodes: props.nodes
    };
  }


  handleFilterTermChange() {
    this.setState(ps => ({
      filteredNodes: ps.filterText ? filterNodes(ps.filterText, this.props.nodes) : this.props.nodes
    }))
  }

  handleFilterTextChange = e => {
    const filterText = e.target.value;

    this.setState({ filterText });

    this.handleFilterTermChange();
  }

  render() {
    const { filterText, filteredNodes } = this.state;

    return (
      <div>
        <input value={filterText} onChange={this.handleFilterTextChange}></input>
        { 
          this.props.children({ nodes: filteredNodes })
        }
      </div>
    )
  }
}

FilteringContainer.propTypes = {
  children: PropTypes.func.isRequired
}