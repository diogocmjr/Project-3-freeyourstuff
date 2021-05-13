import React, { Component } from 'react'

export default class EditItem extends Component {
  render() {
    return (
      <div>
        <h1>Edit this Project</h1>
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
          />

        <label htmlFor="category"></label>
        <select name="category" id="category" value={this.props.category} onChange={this.handleChange}>
          <option value="Category">Category</option>
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

          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            name="description"
            value={this.props.description}
            onChange={this.props.handleChange}
          />

          <label htmlFor="condition"></label>
          <select name="condition" id="condition" value={this.props.condition} onChange={this.handleChange}>
            <option value="Condition">Condition</option>
            <option value="New">New</option>
            <option value="As New">As New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">User - Fair</option>
          </select>

          <button type="submit">Update Item</button>
        </form>
      </div>
    )
  }
}