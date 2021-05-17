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
      <div className="flex flex-col p-8 items-center" key={item._id}>
          <Link to={`/items/${item._id}`}><img className="object-cover h-40 w-40 rounded hover:opacity-70" src={item.imgUrl} alt={item.title}/></Link>
          {this.props.user ? <Link to={`/items/${item._id}`}><h1 className="text-lg mt-2 font-medium hover:underline">{item.title}</h1></Link> : <button onClick={() => this.updateMessage()}><h1>{item.title}</h1></button>}
          <div>{item.condition}</div>
          {/* <div>{item.owner.firstName} {item.owner.lastName}</div> */}
          {/* <div>{item.owner.location.street} {item.owner.location.number}</div> */}
          <span>{item.owner.location.postCode} {item.owner.location.city}</span>
          <span className="text-gray-400 "> ({item.owner.location.country})</span>
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
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 p-8 text-sm">
        {item}
        </div>
      </div>
    )
  }
}
