import React, { Component } from 'react'

export default class SearchBar extends Component {
  render() {
    return (
      <div>
        <input type="text" name="search" id="search" value={this.props.query} onChange={(e) => {this.props.handleSearch(e.target.value)}} placeholder="Search by name"/>
      </div>
    )
  }
}
