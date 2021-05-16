import React, { Component } from 'react';
import axios from 'axios';
import service from '../services/service';

export default class EditProfile extends Component {
  
  state = {
    firstName: '',
    lastName: '',
    imgUrl: '',
    email: '',
    phoneNumber: '',
    street: '',
    number: '',
    city: '',
    postCode: '',
    message: ''
  }

  getData = () => {
    axios.get(`/api/auth/${this.props.user._id}`)
      .then(response => {
        this.setState({
          firstName: response.data.firstName, 
          lastName: response.data.lastName, 
          imgUrl: response.data.imgUrl, 
          email: response.data.email, 
          phoneNumber: response.data.phoneNumber, 
          street: response.data.street, 
          number: response.data.number, 
          city: response.data.city, 
          postCode: response.data.postCode
        })
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            message: 'Not found 🤷‍♀️🤷‍♂️'
          })
        }
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

  handleSubmit = e => {
    const { firstName, lastName, imgUrl, email, phoneNumber, street, number, city, postCode } = this.state;
    e.preventDefault();
    console.log('firstname', firstName)
    axios.put(`/api/auth/${this.props.user._id}`, {
      firstName, 
      lastName, 
      imgUrl, 
      email, 
      phoneNumber, 
      street, 
      number, 
      city, 
      postCode
    })
    .then(response => {
      console.log('response:', response.data)
      this.setState({
        firstName: response.data.firstName, 
        lastName: response.data.lastName, 
        imgUrl: response.data.imgUrl, 
        email: response.data.email, 
        phoneNumber: response.data.phoneNumber, 
        street: response.data.street, 
        number: response.data.number, 
        city: response.data.city, 
        postCode: response.data.postCode,
        message: 'Information updated succesfully'
      })
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="flex-col">
        
        {this.state.message && (
          <div className="flex justify-center my-4">
            <div className="w-6/12 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">{this.state.message}</strong>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6 mb-3 text-3xl font-bold text-gray-900">
          <h1>Edit profile</h1>         
        </div>
       
        <div className="flex justify-center">
          <form onSubmit={this.handleSubmit}>
            <div className="my-1">
              <label className="text-xs" htmlFor="firstName">Name</label>
              <input
                className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Name"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
            
            <div className="my-1">
              <label className="text-xs" htmlFor="lastName">Surname</label>
              <input
                className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Surname"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
          
            <div className="my-1">
              <label className="text-xs" htmlFor="email">Email</label>
              <input
                className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            
            <div className="my-1">
              <label className="text-xs" htmlFor="phoneNumber">Phone Number</label>
              <input
                className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                type="string"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
              />
            </div>
            
            <div className="my-1">
              <label className="text-xs" htmlFor="street">Street</label>
              <input
                className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                type="string"
                id="street"
                name="street"
                placeholder="Street"
                value={this.state.street}
                onChange={this.handleChange}
              />
            </div>
            
            <div className="my-1">
              <label className="text-xs" htmlFor="number">Number</label>
              <input
                className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                type="number"
                id="number"
                name="number"
                placeholder="Number"
                value={this.state.number}
                onChange={this.handleChange}
              />
            </div>
            
            <div className="my-1">
              <label className="text-xs" htmlFor="city">City</label>
              <input
                className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                type="string"
                id="city"
                name="city"
                placeholder="City"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </div>
            
            <div className="my-1">
              <label className="text-xs" htmlFor="postCode">Post Code</label>
              <input
                className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                type="string"
                id="postCode"
                name="postCode"
                placeholder="PostCode"
                value={this.state.postCode}
                onChange={this.handleChange}
              />
            </div>
            
            <div className="my-1">
                <img 
                  className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100" 
                  src={this.state.imgUrl} 
                  alt="" 
                />
                <input 
                  className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  type="file" 
                  name='imgUrl' 
                  onChange={this.handleFileUpload}                 
                />
            </div>
            
            <div className="flex justify-center my-1">
              <button className="relative w-60 my-4 flex justify-center content-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Update</button>          
            </div>
          </form>
        </div>
      </div>
    )
  }
}
