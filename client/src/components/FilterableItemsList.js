import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ItemsList from './ItemsList'

export default class FilterableItemsList extends Component {
  state = {
    query: '',
    condition: 'Condition',
    status: 'Status',
    category: 'Category'
  }

  handleSearch = queryParam => {
    this.setState({
        query: queryParam
    })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
  
  render() {
    return (
      <div>
        <SearchBar handleChange={this.handleChange} handleSearch={this.handleSearch} query={this.state.query} condition={this.state.condition} status={this.state.status} category={this.state.category}/>
        <ItemsList items={this.props.items} query={this.state.query} condition={this.state.condition} status={this.state.status} category={this.state.category}/>
      </div>
    )
  }
}
