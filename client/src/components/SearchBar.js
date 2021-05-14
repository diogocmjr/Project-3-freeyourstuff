import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
      <div className="inline-flex justify-center">
        <div>
          <input className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" type="text" name="search" id="search" value={this.props.query} onChange={(e) => {this.props.handleSearch(e.target.value)}} placeholder="Search"/>
        </div>
        <div className="relative inline-flex text-left">
            <div>
              <select className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="category" id="category" value={this.props.category} onChange={(e) => {this.props.handleChange(e)}}>
                <option value='Category'> Category </option>
                <option className="text-gray-700 block px-4 py-2 text-sm" value="Books">Books</option>
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
            <div className="filters">
              <select className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="condition" id="condition" value={this.props.condition} onChange={(e) => {this.props.handleChange(e)}}>
                <option value='Condition'> Condition</option>
                <option value="New">New</option>
                <option value="As New">As New</option>
                <option value="Used - Good">Used - Good</option>
                <option value="Used - Fair">User - Fair</option>
              </select>
            </div>
            <div className="filters">
              <select className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="status" id="status" value={this.props.status} onChange={(e) => {this.props.handleChange(e)}}>
                <option value='Available'> Available</option>
                <option value="Reserved">Reserved</option>
              </select>
              </div>
          </div>
        </div>
    )
  }
}
