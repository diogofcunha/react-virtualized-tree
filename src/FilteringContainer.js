import React from 'react';
import PropTypes from 'prop-types';

const filterNodes = (searchTerm, nodes) => nodes.reduce((nds, n) => {
  let filteredChildren = [];

  if (n.children) {
    filteredChildren = filterNodes(searchTerm, n.children);
  }

  if (n.name.indexOf(searchTerm) > -1 || filteredChildren.length) {
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
    this.setState(ps => ({ filteredNodes: filterNodes(ps.filterText, this.props.nodes) }))
  }

  handleFilterTextChange = e => {
    const filterText = e.target.value;

    this.setState({ filterText });

    this.handleFilterTermChange();
  }

  render() {
    const { nodes } = this.props;
    const { filterText } = this.state;

    return (
      <div>
        <input value={filterText} onChange={this.handleFilterTextChange}></input>
        { 
          this.props.children()
        }
      </div>
    )
  }
}

FilteringContainer.propTypes = {
  children: PropTypes.func.isRequired
}