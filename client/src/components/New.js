import React, { Component } from 'react';
import axios from 'axios';
export default class New extends Component {

  state = {
    title: '',
    category: '',
    description: '',
    owner: this.props.user._id,
    condition: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    const { title, category, description, condition } = this.state;
    axios.post('/api/items/new', {
      title,
      category,
      description,
      condition
    })
    .then(response => {
      this.setState({
        title: '',
        category: '',
        description: '',
        condition: ''
      })
      this.props.getData();
      this.props.history.push('/');
    })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <label htmlFor="category"></label>
        <select name="category" id="category" onChange={this.handleChange}>
          <option defaultValue> Category </option>
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
        <label htmlFor="title">Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <label htmlFor="condition"></label>
        <select name="condition" id="condition" value={this.state.condition} onChange={this.handleChange}>
          <option defaultValue> Condition</option>
          <option value="New">New</option>
          <option value="As New">As New</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Fair">User - Fair</option>
        </select>
        <button type="submit">Add new ad</button>
      </form>
    )
  }
}
