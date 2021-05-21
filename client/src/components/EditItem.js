import React, { Component } from 'react'
import service from '../services/service';
import axios from 'axios'

export default class EditItem extends Component {
  state = {
    item: {},
    title: '',
    category: '',
    description: '',
    condition: '',
    imgUrl: '',
    owner: {},
    status: '',
    location: {}
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

  componentDidMount() {
    this.getData();
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
    .then(() => {
      this.props.updateMessage('Item information updated succesfully')
      this.props.history.push('/dashboard');
    })
    .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div className="flex flex-col justify-center">
        <div className="flex justify-center mt-6 mb-4 text-3xl font-bold text-gray-900">Edit this item</div>
        <div className="flex justify-center">
        <form onSubmit={this.handleSubmit}>
          <div className="flex-col my-2">
            <label className="text-xs my-2" htmlFor="image_upload">Add Image</label>
            <img 
              className="flex justify-center w-80 rounded-md mb-2" 
              src={this.state.imgUrl} 
              alt="" 
            />
            <input className="flex items-center ml-1 w-80" type="file" name='imgUrl' onChange={e => this.handleFileUpload(e)}/>
          </div>
        
          <div className="flex-col my-2">
            <div><label className="text-xs" htmlFor="title">Title</label></div>
            <input
              className="w-80 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              type="text"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex-col my-2 justify-center">
          <div><label className="text-xs" htmlFor="category">Category</label></div>
          <select className="w-80 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="category" id="category" value={this.props.category} onChange={this.props.handleChange}>
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
          </div>

          <div className="flex-col my-2">
            <div><label className="text-xs" htmlFor="description">Description</label></div>
            <textarea
              className="w-80 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              type="text"
              id="description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="flex-col my-2">
            <div><label className="text-xs" htmlFor="condition">Condition</label></div>
            <select className="w-80 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="condition" id="condition" value={this.state.condition} onChange={this.handleChange}>
              <option value="Condition">Condition</option>
              <option value="New">New</option>
              <option value="As New">As New</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Used - Fair">Used - Fair</option>
              <option value="N/A">N/A</option>
            </select>
          </div>

          <div className="flex-col my-2">
            <div><label className="text-xs" htmlFor="status">Status</label></div>
            <select className="w-80 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="status" id="status" value={this.state.status} onChange={this.handleChange}>
              <option value='Available'> Available</option>
              <option value='Reserved'>Reserved</option>
            </select>
          </div>
        <button className="relative w-80 my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Update Item</button>
        </form>
        </div>
      </div>
    )
  }
}