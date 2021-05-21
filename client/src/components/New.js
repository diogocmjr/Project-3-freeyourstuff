import React, { Component } from 'react';
import axios from 'axios';
import service from '../services/service';

import mbxClient from '@mapbox/mapbox-sdk'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const accessToken = 'pk.eyJ1IjoidHJhbnNpcmVudCIsImEiOiJja255bXRtZGowbHF0MnBvM3U4d2J1ZG5vIn0.IVcxB9Xw6Tcc8yHGdK_0zA'
const baseClient = mbxClient({ accessToken: accessToken })
const geocodingClient = mbxGeocoding(baseClient)

export default class New extends Component {

  state = {
    title: '',
    category: '',
    description: '',
    status: '',
    owner: this.props.user._id,
    coordinates: '',
    condition: '',
    imgUrl: 'https://res.cloudinary.com/dvzi6gpqd/image/upload/v1621455478/thing-gallery/placeholder_g0qzei.png'
  }

  componentDidMount() {
    if (this.props.user.location) {
      const { street, number, postCode, city } = this.props.user.location
      geocodingClient.forwardGeocode({
        query: `${street} ${number} ${city}, ${postCode}`,
        autocomplete: false,
        limit: 1
      }) 
      .send()
      .then(response => {
        this.setState({
          coordinates: response.body.features[0].center
        })
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imgUrl !== '') {
      const { title, category, description, condition, imgUrl, coordinates } = this.state;
      axios.post('/api/items/new', {
        title,
        category,
        description,
        condition,
        owner: this.state.owner,
        imgUrl,
        coordinates
      })
      .then(response => {
        this.setState({
          title: '',
          category: '',
          description: '',
          condition: '',
          imgUrl: ''
        })
        this.props.getData();
        this.props.history.push('/dashboard');
      })
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append('imgUrl', e.target.files[0]);
 
    service
      .handleUpload(uploadData)
      .then(response => {
        this.setState({ imgUrl: response.secure_url });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      });
  };

  render() {
    return (
      <div className="flex-col">

      <div className="flex justify-center mt-6 mb-3 text-3xl font-bold text-gray-900">
          <h1>List your new item</h1>         
        </div>

      <div className="flex justify-center">
      <form onSubmit={this.handleSubmit}>
        <div className="flex-col my-2">
            <label className="text-xs my-2" htmlFor="image_upload">Add Image</label>
            <img 
              className="flex justify-center w-60 rounded-md mb-2" 
              src={this.state.imgUrl} 
              alt="" 
            />
            <input className="flex items-center ml-1 w-60" type="file" name='imgUrl' onChange={this.handleFileUpload} required/>
        </div>
        
        <div className="flex-col my-2">
          <label className="text-xs" htmlFor="title">Title: </label>
          <input
            className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="flex-col my-2">
          <label className="text-xs" htmlFor="category">Category: </label>
          <select defaultValue="Category" className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="category" id="category" onChange={this.handleChange} required>
            <option value="Category" disabled="disabled">Category</option>
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

        <div className="flex-col my-2">
          <label className="text-xs" htmlFor="title">Description: </label>
          <textarea
            className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            type="text"
            name="description"
            id="description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
        </div>

        <div className="flex-col my-2">
          <label className="text-xs" htmlFor="title">Condition: </label>
          <select defaultValue="Condition" className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="condition" id="condition" onChange={this.handleChange} required>
            <option value="Condition" disabled="disabled">Condition</option>
            <option value="New">New</option>
            <option value="As New">As New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">Used - Fair</option>
            <option value="N/A">N/A</option>
          </select>
        </div>

        <div className="flex-col my-2">
         <button className="relative w-60 my-4 flex justify-center content-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">New item</button>          
        </div>

      </form>
      </div>
      </div>
    )
  }
}
