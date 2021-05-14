import React, { Component } from 'react'
import axios from 'axios'

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
      <div>
        <h1>Edit profile</h1>
        {this.state.message && (<h1>{this.state.message}</h1>)}
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="firstName"></label>
            <input
              className="inline-flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Name"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <label htmlFor="lastName"></label>
            <input
              className="inline-flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Surname"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <label htmlFor="email"></label>
            <input
              className="inline-flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="phoneNumber"></label>
            <input
              className="inline-flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              type="string"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
            <label htmlFor="street"></label>
            <input
              className="inline-flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              type="string"
              id="street"
              name="street"
              placeholder="Street"
              value={this.state.street}
              onChange={this.handleChange}
            />
            <label htmlFor="number"></label>
            <input
              className="inline-flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              type="number"
              id="number"
              name="number"
              placeholder="Number"
              value={this.state.number}
              onChange={this.handleChange}
            />
            <label htmlFor="city"></label>
            <input
              className="inline-flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              type="string"
              id="city"
              name="city"
              placeholder="City"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <label htmlFor="postCode"></label>
            <input
              className="inline-flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              type="string"
              id="postCode"
              name="postCode"
              placeholder="PostCode"
              value={this.state.postCode}
              onChange={this.handleChange}
            />
            <button className="group relative w-40 flex justify-around py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Update</button>          
          </form>
      </div>
    )
  }
}
