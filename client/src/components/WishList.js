import React from 'react'
import { Link }from 'react-router-dom'

export default function WishList(props) {

  const items = props.items.filter(item => item.owner._id === props.user._id).map(item => (
    <div key={item._id}>
      <div>
      <Link to={`/items/${item._id}`}><img className="object-cover h-40 w-40 rounded hover:opacity-70" src={item.imgUrl} alt={item.title}/></Link>
      <h1><Link to={`/items/${item._id}`}>{item.title}</Link></h1>
      <div>{item.condition}</div>
      </div>
    </div>
    ))
  
  const username = props.user.username;

  return (
    <div>
      {username && <div className="text-2xl flex px-10 m-10 justify-start align-text-top flex-wrap gap-3">My Wishlist</div>}
      <div className="flex px-10 m-10 justify-start align-text-top flex-wrap gap-3">
        {items}
      </div>
    </div>
  )
}