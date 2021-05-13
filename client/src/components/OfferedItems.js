import React from 'react'
import { Link }from 'react-router-dom'

export default function OfferedItems(props) {

  const items = props.items.filter(item => item.owner === props.user._id).map(item => (
    <div key={item._id}>
      <h1><Link to={`/items/${item._id}`}>{item.title}</Link></h1>
    </div>
    ))
  
  return (
    <div>
      {items}
    </div>
  )
}
