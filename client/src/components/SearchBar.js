import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchBar extends Component {
  render() {
    return (
      <div className="flex justify-center py-4 fixed z-40 bg-white">
        <div className="px-4 w-80">
          <input className="flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" type="text" name="search" id="search" value={this.props.query} onChange={(e) => {this.props.handleSearch(e.target.value)}} placeholder="Search"/>
        </div>
        <div className="relative flex text-left">
          <div className="px-2">
            <select className="flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="category" id="category" value={this.props.category} onChange={(e) => {this.props.handleChange(e)}}>
              <option value='Category'> All Categories </option>
              <option value="Books">Books</option>
              <option value="Clothing & Accessories">Clothing & Accessories</option>
              <option value="Electronics">Electronics</option>
              <option value="Family & Baby">Family & Baby</option>
              <option value="Hobbies">Hobbies</option>
              <option value="House & Garden">House & Garden</option>
              <option value="Music & Movies">Music & Movies</option>
              <option value="Pets">Pets</option>
              <option value="Transports">Transports</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="px-2">
            <select className="flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="condition" id="condition" value={this.props.condition} onChange={(e) => {this.props.handleChange(e)}}>
              <option value='Condition'>Any Condition</option>
              <option value="New">New</option>
              <option value="As New">As New</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Used - Fair">User - Fair</option>
            </select>
          </div>
          <div className="px-2">
            <select className="flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="status" id="status" value={this.props.status} onChange={(e) => {this.props.handleChange(e)}}>
              <option value='Status'>Any Status</option>
              <option value='Available'>Available</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>
        
          <div className="px-2">
            {this.props.user ? <button className="relative w-30 flex justify-center content-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit"><Link to='/new'>Add Item</Link></button>  : <button className="relative w-30 flex justify-center content-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => this.props.updateMessage('Please log in to add an item')}><p>Add Item</p></button> }         
          </div>
        </div>
      </div>
    )
  }
}
