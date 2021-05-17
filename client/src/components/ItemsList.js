import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ItemsList extends Component {
  render() {

    console.log('items', this.props.items)
    
    const filteredItems = this.props.items.filter(item => {
      return item.title.toLowerCase().includes(this.props.query.toLowerCase())
             && (this.props.condition === 'Condition' ? true : item.condition === this.props.condition)
             && (this.props.status === 'Status' ? true : item.status === this.props.status)
             && (this.props.category === 'Category' ? true : item.category === this.props.category)
    })

    const item = filteredItems.map(item => (
      <div key={item._id}>
      <div className="flex-col">
        <div><img className="h-40 w-60 mx-10 my-2" src={item.imgUrl} alt={item.title} /></div>
        <div><Link to={`/items/${item._id}`}>{item.title}</Link></div>
        <div>{item.condition}</div>
        <div>{item.owner.firstName} {item.owner.lastName}</div>
        <div>{item.owner.location.street} {item.owner.location.number} {item.owner.location.city}, {item.owner.location.country} {item.owner.location.postCode}</div>
      </div>
      </div>
      ))

    return (
      <div>
        {item}
      </div>
    )
  }
}
