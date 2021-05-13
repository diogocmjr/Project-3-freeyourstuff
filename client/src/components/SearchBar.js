import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        <input type="text" name="search" id="search" value={this.props.query} onChange={(e) => {this.props.handleSearch(e.target.value)}} placeholder="Search by name"/>
        <select name="category" id="category" value={this.props.category} onChange={(e) => {this.props.handleChange(e)}}>
          <option value='Category'> Category </option>
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
        <select name="condition" id="condition" value={this.props.condition} onChange={(e) => {this.props.handleChange(e)}}>
          <option value='Condition'> Condition</option>
          <option value="New">New</option>
          <option value="As New">As New</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Fair">User - Fair</option>
        </select>
        <select name="status" id="status" value={this.props.status} onChange={(e) => {this.props.handleChange(e)}}>
          <option value='Available'> Available</option>
          <option value="Reserved">Reserved</option>
        </select>
      </div>
    )
  }
}
