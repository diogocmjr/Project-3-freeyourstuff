import React, { Component } from 'react';
import axios from 'axios';
import service from '../services/service';
export default class EditProfile extends Component {
  
  state = {
    firstName: this.props.user.firstName || '',
    lastName: this.props.user.lastName || '',
    imgUrl: this.props.user.imgUrl,
    email: this.props.user.email || '',
    phoneNumber: this.props.user.phoneNumber || '',
    street: '',
    number: '',
    city: '',
    country: '',
    postCode: '',
    popup: false
  }

  componentDidMount() {
    if (this.props.user.location) {
      this.setState({
        street: this.props.user.location.street,
        number: this.props.user.location.number,
        city: this.props.user.location.city,
        country: this.props.user.location.country,
        postCode: this.props.user.location.postCode
      })
    }
  }

  handlePopup = () => {
    this.setState(state => ({
      popup: !state.popup
    }))
  }

  deleteAccount = () => {
    axios.delete(`api/user/${this.props.user._id}`)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err)
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
    const { firstName, lastName, imgUrl, email, phoneNumber, street, number, city, country, postCode } = this.state;
    e.preventDefault();
    axios.put(`/api/user/${this.props.user._id}`, {
      firstName, 
      lastName, 
      imgUrl, 
      email, 
      phoneNumber, 
      street, 
      number, 
      city, 
      country,
      postCode
    })
    .then(() => {
      this.props.updateMessage('Information updated succesfully')
      this.props.getUser();
      this.props.history.push('/dashboard');
    })
    .catch(err => console.log(err));
  }

  render() {
    console.log('state', this.state)
    return (
      <div className="flex-col">
        
        <div className="flex justify-center mt-6 mb-3 text-3xl font-bold text-gray-900">
          <h1>Settings</h1>         
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
              <input className="flex items-center ml-1 w-60" type="file" name='imgUrl' onChange={this.handleFileUpload}/>
            </div>
            
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
              <label className="text-xs" htmlFor="country">Country</label>
              <input
                className="flex justify-center w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                type="string"
                id="country"
                name="country"
                placeholder="Country"
                value={this.state.country}
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
            
            <div className="flex justify-center my-1">
              <button className="relative w-60 mt-4 mb-2 flex justify-center content-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Update Account</button>        
            </div>
          </form>
        </div>

        <div className="flex justify-center my-1">
          <button 
            className="relative w-60 mb-4 flex justify-center content-center py-2 px-4 border border-red-600 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => this.handlePopup()}>Delete Account</button> 
        </div>

        {this.state.popup && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Delete account
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={() => this.deleteAccount()} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Delete account
                  </button>
                  <button onClick={() => this.handlePopup()} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}