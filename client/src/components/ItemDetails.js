import axios from 'axios';
import React, { Component } from 'react'
import EditItem from './EditItem';

export default class ItemDetails extends Component {

  state = {
    title: '',
    category: '',
    description: '',
    condition: '',
    error: null,
    editForm: false,
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
          item: response.data,
          title: response.data.title,
          category: response.data.category,
          description: response.data.description,
          condition: response.data.condition
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
    axios.delete(`/api/items/${this.state.item._id}`)
      .then(() => {
        this.props.getData();
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
    const { title, category, description, condition } = this.state;
    e.preventDefault();
    axios.put(`/api/items/${this.state.item._id}`, {
      title,
      category,
      description,
      condition
    })
      .then(response => {
        this.setState({
          item: response.data,
          title: response.data.title,
          category: response.data.category,
          description: response.data.description,
          condition: response.data.condition,
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
        <h1>{this.state.item.title}</h1>
        <p>{this.state.item.category}</p>
        <p>{this.state.item.description}</p>
        <p>{this.state.item.condition}</p>
        <button onClick={this.deleteItem}>Delete Item</button>
        <button onClick={this.toggleEditForm}>Edit Item</button>
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