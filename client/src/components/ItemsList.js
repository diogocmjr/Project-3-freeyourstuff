import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ItemsList extends Component {
  render() {   
    const filteredItems = this.props.items.filter(item => {
      return item.title.toLowerCase().includes(this.props.query.toLowerCase())
             && (this.props.user && item.owner._id !== this.props.user._id)
             && (this.props.condition === 'Condition' ? true : item.condition === this.props.condition)
             && (this.props.status === 'Status' ? true : item.status === this.props.status)
             && (this.props.category === 'Category' ? true : item.category === this.props.category)
    })

    const item = filteredItems.map(item => (
      <div key={item._id} className="flex-col">
        <div><img className="h-40 w-60 mx-10 my-2" src={item.imgUrl} alt={item.title} /></div>
        {this.props.user ? <Link to={`/items/${item._id}`}><h1>{item.title}</h1></Link> : <button onClick={() => this.props.updateMessage()}><h1>{item.title}</h1></button>}
        <div>{item.condition}</div>
        <div>{item.owner.firstName} {item.owner.lastName}</div>
        <div>{item.owner.location.street} {item.owner.location.number} {item.owner.location.city}, {item.owner.location.country} {item.owner.location.postCode}</div>
      </div>
    ))

    return (
      <div className="mt-24">
        {this.props.message && (
          <div className="flex justify-center my-4">
            <div className="w-6/12 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">{this.props.message}</strong>
              <button onClick={() => this.props.removeMessage()} class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-3 mr-4 outline-none focus:outline-none">
                <span>×</span>
              </button>
            </div>
          </div>
        )}
        {item}
      </div>
    )
  }
}
