import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ItemsList from './ItemsList'

export default class FilterableItemsList extends Component {
  state = {
    query: '',
    condition: 'Condition',
    status: 'Status',
    category: 'Category',
    message: ''
  }

  updateMessage = (message) => {
    this.setState({
      message: message
    })
  }

  removeMessage = () => {
    this.setState({
      message: ''
    })
  }

  componentWillUnmount() {
    this.setState({
      message: ''
    })
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
        <SearchBar updateMessage={this.updateMessage} removeMessage={this.removeMessage} user={this.props.user} handleChange={this.handleChange} handleSearch={this.handleSearch} query={this.state.query} condition={this.state.condition} status={this.state.status} category={this.state.category}/>
        <ItemsList updateMessage={this.updateMessage} removeMessage={this.removeMessage} message={this.state.message} user={this.props.user} items={this.props.items} query={this.state.query} condition={this.state.condition} status={this.state.status} category={this.state.category}/>
      </div>
    )
  }
}
