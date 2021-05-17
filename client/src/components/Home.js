import React, { Component } from 'react'
import FilterableItemsList from './FilterableItemsList'

export default class Home extends Component {
  
  render() {
    return (
      <FilterableItemsList user={this.props.user} items={this.props.items}/>
    )
  }
}

