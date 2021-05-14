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
            <label htmlFor="firstName">First name: </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <label htmlFor="lastName">Last name: </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="phoneNumber">Phone number: </label>
            <input
              type="string"
              id="phoneNumber"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
            />
            <label htmlFor="street">Street: </label>
            <input
              type="string"
              id="street"
              name="street"
              value={this.state.street}
              onChange={this.handleChange}
            />
            <label htmlFor="number">Number: </label>
            <input
              type="number"
              id="number"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
            />
            <label htmlFor="city">City: </label>
            <input
              type="string"
              id="city"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <label htmlFor="postCode">Postal code: </label>
            <input
              type="string"
              id="postCode"
              name="postCode"
              value={this.state.postCode}
              onChange={this.handleChange}
            />
            <button type="submit">Update</button>          
          </form>
      </div>
    )
  }
}
