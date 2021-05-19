import React from 'react'
import { Link }from 'react-router-dom'

export default function WishList(props) {

  console.log('user favourites', props.user.favourites)

  const items = props.user.favourites.map(item => (
    <div key={item._id}>
      <Link to={`/items/${item._id}`}><img className="object-cover h-40 w-40 rounded hover:opacity-70" src={item.imgUrl} alt={item.title}/></Link>
      <h1 className="text-lg mt-2 font-medium hover:underline"><Link to={`/items/${item._id}`}>{item.title}</Link></h1>
      <div>{item.condition}</div>
    </div>
    ))

  return (
    <div>
      <div className="text-2xl flex px-10 m-10 justify-start align-text-top flex-wrap gap-3">My wish list</div>
      <div className="flex px-10 m-10 justify-start align-text-top flex-wrap gap-3">
        {items}
      </div>
    </div>
  )
}