import axios from 'axios';
import React, { Component } from 'react';
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
    if (this.state.error) return <h2>{this.state.error}</h2>
    return (
      <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        {!this.state.editForm ? 
        (<div>
          <img src={this.state.imgUrl} alt={this.state.title} />
          <h1>{this.state.title}</h1>
          <p>{this.state.category}</p>
          <p>{this.state.description}</p>
          <p>{this.state.condition}</p>
          <p>{this.state.owner.username}</p>
          <p>{this.state.location.street} {this.state.location.number} {this.state.location.city}, {this.state.location.postCode}</p>
          <p>{this.state.owner.phoneNumber}</p>
          <p>{this.state.owner.email}</p>
          {this.props.user !== null && this.state.owner._id === this.props.user._id && (
            <div className="flex-row">
              <button
              className="group relative w-60 justify-center py-2 mx-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={this.toggleEditForm}>Edit Item</button>
              <button
              className="group relative w-60 justify-center py-2 mx-2 px-4 border-2 text-sm font-medium rounded-md text-red-800 border-red-800 bg-transparent hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
      </div>
    )
  }
}