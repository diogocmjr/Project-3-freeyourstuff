import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ItemsList from './ItemsList';
import Welcome from './Welcome'
import Map from './Map'

export default class Home extends Component {
  state = {
    query: '',
    condition: 'Condition',
    status: 'Status',
    category: 'Category',
    message: '',
    map: false
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
  
  toggleMap = () => {
    this.setState(state => ({
      map: !state.map
    }))
  }

  render() {
    if (!this.props.items) return <></>

    const filteredItems = this.props.items.filter(item => {
      return item.title.toLowerCase().includes(this.state.query.toLowerCase())
             && (this.props.user ? item.owner._id !== this.props.user._id : true)
             && (this.state.condition === 'Condition' ? true : item.condition === this.state.condition)
             && (this.state.status === 'Status' ? true : item.status === this.state.status)
             && (this.state.category === 'Category' ? true : item.category === this.state.category)
    })

    return (
      <>
        <SearchBar updateMessage={this.updateMessage} removeMessage={this.removeMessage} user={this.props.user} handleChange={this.handleChange} handleSearch={this.handleSearch} query={this.state.query} condition={this.state.condition} status={this.state.status} category={this.state.category} toggleMap={this.toggleMap} map={this.state.map}/>
        {(!this.state.query && this.state.condition === 'Condition' && this.state.status === 'Status' && this.state.category === 'Category' && !this.props.user) ? <Welcome /> : 
          !this.state.map ? <ItemsList updateMessage={this.updateMessage} removeMessage={this.removeMessage} message={this.state.message} user={this.props.user} filteredItems={filteredItems}/> : 
          <Map filteredItems={filteredItems}/>}
      </>
    )
  }
}
