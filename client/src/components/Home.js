import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ItemsList from './ItemsList';
import Welcome from './Welcome'

export default class Home extends Component {
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
    setTimeout(
      () => this.setState({ message: '' }), 
      3000
    );
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
      <>
        <SearchBar updateMessage={this.updateMessage} removeMessage={this.removeMessage} user={this.props.user} handleChange={this.handleChange} handleSearch={this.handleSearch} query={this.state.query} condition={this.state.condition} status={this.state.status} category={this.state.category}/>
        {(!this.state.query && this.state.condition === 'Condition' && this.state.status === 'Status' && this.state.category === 'Category' && !this.props.user) ? <Welcome /> : <ItemsList updateMessage={this.updateMessage} removeMessage={this.removeMessage} message={this.state.message} user={this.props.user} items={this.props.items} query={this.state.query} condition={this.state.condition} status={this.state.status} category={this.state.category}/>}
      </>
    )
  }
}
