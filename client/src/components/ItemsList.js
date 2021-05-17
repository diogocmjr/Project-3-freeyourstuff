import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ItemsList extends Component {
  render() {   
    const filteredItems = this.props.items.filter(item => {
      return item.title.toLowerCase().includes(this.props.query.toLowerCase())
             && (this.props.condition === 'Condition' ? true : item.condition === this.props.condition)
             && (this.props.status === 'Status' ? true : item.status === this.props.status)
             && (this.props.category === 'Category' ? true : item.category === this.props.category)
    })

    const item = filteredItems.map(item => (
      <div key={item._id}>
        <img src={item.imgUrl} alt={item.title} />
        <h1><Link to={`/items/${item._id}`}>{item.title}</Link></h1>
        <h3>{item.condition}</h3>
        <h3>{item.owner.firstName} {item.owner.lastName}</h3>
        <h3>{item.owner.location.street} {item.owner.location.number} {item.owner.location.city} {item.owner.location.postCode}</h3>        
      </div>
    ))

    return (
      <div>
        {item}
      </div>
    )
  }
}
