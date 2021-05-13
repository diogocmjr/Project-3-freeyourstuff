import React, { Component } from 'react'
import FilterableItemsList from './FilterableItemsList'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  
  render() {
    return (
      <div>
        <Link to='/new'>Add Item</Link>
        <FilterableItemsList items={this.props.items}/>
      </div>
    )
  }
}
