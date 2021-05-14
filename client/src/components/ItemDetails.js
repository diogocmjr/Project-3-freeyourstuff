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
    owner: '',
    status: '',
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
          owner: response.data.owner
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
        // console.log('response is: ', response);
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
        owner: response.data.owner,
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
    if (!this.state.item) return <></>
    return (
      <>
        {!this.state.editForm ? 
        (<>
          <img src={this.state.imgUrl} alt={this.state.title} />
          <h1>{this.state.title}</h1>
          <p>{this.state.category}</p>
          <p>{this.state.description}</p>
          <p>{this.state.condition}</p>
          <p>{this.state.owner}</p>
          {this.props.user !== null && this.state.owner === this.props.user._id && (
            <>
              <button onClick={this.deleteItem}>Delete Item</button>
              <button onClick={this.toggleEditForm}>Edit Item</button>
            </>
          )}
        </>) :
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