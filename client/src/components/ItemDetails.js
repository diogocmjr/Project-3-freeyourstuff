import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import service from '../services/service';
import EditItem from './EditItem';

export default class ItemDetails extends Component {

  state = {
    item: {},
    title: '',
    category: '',
    description: '',
    condition: '',
    imgUrl: '',
    owner: {},
    status: '',
    location: {},
    editForm: false
  }

  toggleEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm
    }))
  }

  getData = () => {
    axios.get(`/api/items/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          item: response.data,
          title: response.data.title,
          category: response.data.category,
          description: response.data.description,
          condition: response.data.condition,
          imgUrl: response.data.imgUrl,
          status: response.data.status,
          owner: response.data.owner,
          location: response.data.owner.location
        })
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: 'Not found 🤷‍♀️🤷‍♂️'
          })
        }
      })
  }

  deleteItem = () => {
    axios.delete(`/api/items/${this.state.item._id}`)
      .then(() => {
        this.props.getData();
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err)
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

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    const { title, category, description, condition, imgUrl, status } = this.state;
    e.preventDefault();
    axios.put(`/api/items/${this.state.item._id}`, {
      title,
      category,
      description,
      condition,
      status,
      imgUrl
    })
    .then(response => {
      this.setState({
        item: response.data,
        title: response.data.title,
        category: response.data.category,
        description: response.data.description,
        condition: response.data.condition,
        status: response.data.status,
        imgUrl: response.data.imgUrl,
        editForm: false
      })
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    console.log(this.state.owner)
    if (this.state.error) return <h2>{this.state.error}</h2>
    return (
      <>
        {!this.state.editForm ? 
        (<div className="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-20 sm:gap-x-8 md:py-16">
          <div className="z-10 col-start-1 row-start-1 px-4 pt-20 pb-4 bg-gradient-to-t from-black via-transparent sm:bg-none">
            <p className="text-md font-medium text-white sm:mb-1 sm:text-gray-500">{this.state.category}</p>
            <h2 className="text-2xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">{this.state.title}</h2>
          </div>
          <div className="col-start-1 row-start-2 px-4 py-2 sm:pb-16">
            <div className="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
              {/* <svg width="20" height="20" fill="currentColor" className="text-violet-600">
              <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
              </svg> */}
              <div className="ml-1">
                <span className="text-black">{this.state.condition}</span>
                <span className="text-base font-normal mx-2">·</span>
                <span>{this.state.location.street} {this.state.location.number}, {this.state.location.postCode} {this.state.location.city}</span>
                <span className="text-gray-400"> ({this.state.location.country})</span>
              </div>
            </div>
          <hr className="w-16 border-gray-300 hidden sm:block"></hr>
          <div className="my-4">{this.state.description}</div>
          </div>
          <div className="col-start-1 row-start-3 space-y-1 px-4 py-4">
            <div className="flex items-center text-black text-sm font-medium">
            <Link to={`/profile/${this.state.owner._id}`}><div className="mr-2 bg-gray-100">By {this.state.owner.username}</div></Link>
            </div>
            <div className="flex flex-row text-sm">
              <span>{this.state.owner.phoneNumber}</span>
              <span className="text-base font-normal mx-2">·</span>
              <span>{this.state.owner.email}</span>
            </div>
          </div>
          <div className="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
        <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
          <div className="relative col-span-3 row-span-2 md:col-span-2">
            <img src={this.state.imgUrl} alt={this.state.title} className="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg" />
          </div>
          <div className="relative hidden md:block">
            <img src={this.state.imgUrl} alt={this.state.title} className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
          </div>
          <div className="relative hidden md:block">
            <img src={this.state.imgUrl} alt={this.state.title} className="absolute inset-0 w-full h-full object-cover rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>

          {this.props.user !== null && this.state.owner._id === this.props.user._id && (
            <div className="flex-row py-3">
              <button
              className="group relative w-40 justify-center py-2 mx-2 px-4 sm:my-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={this.toggleEditForm}>Edit Item</button>
              <button
              className="group relative w-40 justify-center py-2 mx-2 px-4 border-2 text-sm font-medium rounded-md text-red-800 border-red-800 bg-transparent hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={this.deleteItem}>Delete Item</button>
            </div>
          )}
        </div>) :
        (<EditItem
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleFileUpload={this.handleFileUpload}
        />)
        }
      </>
    )
  }
}