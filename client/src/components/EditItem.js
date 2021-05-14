import React, { Component } from 'react'

export default class EditItem extends Component {
  render() {
    return (
      <div>
        <h1>Edit this item</h1>
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
          />

          <select name="category" id="category" value={this.props.category} onChange={this.props.handleChange}>
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
          <textarea
            type="text"
            id="description"
            name="description"
            value={this.props.description}
            onChange={this.props.handleChange}
          />

          <select name="condition" id="condition" value={this.props.condition} onChange={this.props.handleChange}>
            <option value="Condition">Condition</option>
            <option value="New">New</option>
            <option value="As New">As New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">User - Fair</option>
          </select>

          <select name="status" id="status" value={this.props.status} onChange={this.props.handleChange}>
          <option value='Available'> Available</option>
          <option value='Reserved'>Reserved</option>
        </select>

          <input type="file" name='imgUrl' onChange={e => this.props.handleFileUpload(e)} />
          <button type="submit">Update Item</button>
        </form>
      </div>
    )
  }
}