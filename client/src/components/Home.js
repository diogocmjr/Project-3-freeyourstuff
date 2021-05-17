import React, { Component } from 'react'
import FilterableItemsList from './FilterableItemsList'

export default class Home extends Component {
  
  render() {
    return (
      <div>
        <div>
          <FilterableItemsList user={this.props.user} items={this.props.items}/>
        </div>
      </div>
    )
  }
}

