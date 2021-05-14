import React, { Component } from 'react';
import axios from 'axios';
import service from '../services/service';

export default class New extends Component {

  state = {
    title: '',
    category: '',
    description: '',
    owner: this.props.user._id,
    condition: '',
    imgUrl: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    const { title, category, description, condition, imgUrl } = this.state;
    console.log('step1', title, category, description, condition, imgUrl )
    axios.post('/api/items/new', {
      title,
      category,
      description,
      condition,
      owner: this.state.owner,
      imgUrl
    })
    .then(response => {
      console.log('respons from backend', response)
      this.setState({
        title: '',
        category: '',
        description: '',
        condition: '',
        imgUrl: ''
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

  handleFileUpload = e => {
     const uploadData = new FormData();
    // imgUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append('imgUrl', e.target.files[0]);
 
    service
      .handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imgUrl: response.secure_url });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      });
  };

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
          <option defaultValue>Category</option>
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
        <textarea
          type="text"
          name="description"
          id="description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <label htmlFor="condition"></label>
        <select name="condition" id="condition" onChange={this.handleChange}>
          <option defaultValue> Condition</option>
          <option value="New">New</option>
          <option value="As New">As New</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Fair">User - Fair</option>
        </select>
        <input type="file" name='imgUrl' onChange={e => this.handleFileUpload(e)} />
        <button type="submit">Add item</button>
      </form>
    )
  }
}
