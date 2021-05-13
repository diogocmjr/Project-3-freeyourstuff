import axios from 'axios';
import React, { Component } from 'react'
import EditItem from './EditItem';

export default class ItemDetails extends Component {

  state = {
    project: null,
    title: '',
    description: '',
    error: null,
    editForm: false,
    // this is the flag
    // dataRequested: false
  }

  toggleEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm
    }))
  }

  getData = () => {
    axios.get(`/api/items/${this.props.match.params.id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          project: response.data,
          title: response.data.title,
          description: response.data.description,
        })
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 404) {
          this.setState({
            error: 'Not found 🤷‍♀️🤷‍♂️'
          })
        }
      })
  }

  deleteItem = () => {
    axios.delete(`/api/items/${this.state.items._id}`)
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

  handleSubmit = e => {
    const { title, description } = this.state;
    e.preventDefault();
    axios.put(`/api/items/${this.state.items._id}`, {
      title,
      description
    })
      .then(response => {
        this.setState({
          project: response.data,
          title: response.data.title,
          description: response.data.description,
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
    if (!this.state.project) return <></>
    return (
      <>
        <h1>Title: {this.state.project.title}</h1>
        <p>Description: {this.state.project.description}</p>
        <button onClick={this.deleteItem}>Delete this Project ❌</button>
        <button onClick={this.toggleEditForm}>Show Edit Form 📝</button>
        {this.state.editForm && (
          <EditItem
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </>
    )
  }
}