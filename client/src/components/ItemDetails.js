import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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

  deleteItem = () => {
    axios.delete(`/api/items/${this.state.item._id}`)
      .then(() => {
        this.props.getData();
        this.props.updateMessage('Item deleted succesfully')
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.log(err)
      })
  }

  addToFavourites = () => {
    const itemId = this.state.item._id
    axios.put(`/api/user/${this.props.user._id}/favourites`, {
      favourites: itemId
    })
    .then(response => {
      console.log(response.data)
      this.props.getUser()
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.error) return <h2>{this.state.error}</h2>
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-20 sm:gap-x-8 md:py-16">
          <div className="z-10 col-start-1 row-start-1 px-4 pt-20 pb-4 bg-gradient-to-t from-black via-transparent sm:bg-none">
            <p className="text-md font-medium text-white sm:mb-1 sm:text-gray-500">{this.state.category}</p>
            <h2 className="text-2xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">{this.state.title}</h2>
          </div>
          <div className="col-start-1 row-start-2 px-4 py-2 sm:pb-16">
            <div className="flex items-center text-sm font-medium my-5 sm:mt-2 sm:mb-4">
              <div className="ml-1">
                <span className="text-black">{this.state.condition}</span>
                <span className="text-base font-normal mx-2">·</span>
                {this.state.location ? (
                <>
                <span>{this.state.location.street} {this.state.location.number}, {this.state.location.postCode} {this.state.location.city}</span>
                <span className="text-gray-400"> ({this.state.location.country})</span>
                </>
                ) : <span className="text-gray-400">No location specified</span>}
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
              {this.state.owner.phoneNumber && (
                <>
                <span>{this.state.owner.phoneNumber}</span>
                <span className="text-base font-normal mx-2">·</span>
                </>
                )}
              {this.state.owner.email && <span>{this.state.owner.email}</span>}
            </div>
            <div className="flex">
              <button onClick={() => this.addToFavourites()}>Add to favourites</button>
              <button>Contact owner</button>
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
              <Link to={`/items/${this.state.item._id}/edit`}><button
              className="group relative w-40 justify-center py-2 mx-2 px-4 sm:my-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button">Edit Item</button></Link>
              <button
              className="group relative w-40 justify-center py-2 mx-2 px-4 border-2 text-sm font-medium rounded-md text-red-800 border-red-800 bg-transparent hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={this.deleteItem}>Delete Item</button>
            </div>
          )}
        </div>
      </>
    )
  }
}