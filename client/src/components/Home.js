import React, { Component } from 'react'
import FilterableItemsList from './FilterableItemsList'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  
  render() {
    return (
      <div>
        <div>
          <FilterableItemsList items={this.props.items}/>
        </div>
        <div>
          <Link to='/new'>Add Item</Link>
        </div>
      </div>
    )
  }
}
