import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
      <div className="py-4 fixed z-40 bg-white w-full">
        <div className="flex justify-center lg:flex-row sm:flex-col md:flex-col flex-col">
          <div className="px-4 mr-4">
            <input className="flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 mx-2 my-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" type="text" name="search" id="search" value={this.props.query} onChange={(e) => {this.props.handleSearch(e.target.value)}} placeholder="Search"/>
          </div>
          <div className="relative flex lg:flex-row sm:flex-col md:flex-col flex-col text-left w-auto px-4">
            <div className="px-2 my-1">
              <select className="flex justify-center w-full rounded-md border border-gray-300 px-4 shadow-sm py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="category" id="category" value={this.props.category} onChange={(e) => {this.props.handleChange(e)}}>
                <option value="Category"> All Categories </option>
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
            <div className="px-2 my-1">
              <select className="flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="condition" id="condition" value={this.props.condition} onChange={(e) => {this.props.handleChange(e)}}>
                <option value='Condition'>Any Condition</option>
                <option value="New">New</option>
                <option value="As New">As New</option>
                <option value="Used - Good">Used - Good</option>
                <option value="Used - Fair">User - Fair</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
            <div className="px-2 my-1">
              <select className="flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="status" id="status" value={this.props.status} onChange={(e) => {this.props.handleChange(e)}}>
                <option value='Status'>Any Status</option>
                <option value='Available'>Available</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
            <div className="flex justify-center px-2 lg:my-1 my-2">
              <button onClick={() => this.props.toggleMap()} className="flex text-gray-100 bg-gray-600 hover:bg-gray-100 hover:text-gray-700 lg:ml-8 px-3.5 py-1.5 rounded-md font-medium" type="button">{this.props.map ? 'List' : 'Map'}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}