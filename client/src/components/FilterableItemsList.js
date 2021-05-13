import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ItemsList from './ItemsList'

export default class FilterableItemsList extends Component {
  state = {
    query: ''
  }

  handleSearch = queryParam => {
    this.setState({
        query: queryParam
    })
  }
  
  render() {
    return (
      <div>
        <SearchBar query={this.state.query} handleSearch={this.handleSearch} />
        <ItemsList items={this.props.items} query={this.state.query} />
      </div>
    )
  }
}
