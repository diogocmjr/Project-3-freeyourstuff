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
        <button className="relative w-30 my-4 flex justify-center content-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit"><Link to='/new'>Add Item</Link></button>          
        </div>
      </div>
    )
  }
}

