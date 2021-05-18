import React from 'react'
import { Link }from 'react-router-dom'

export default function OfferedItems(props) {

  const items = props.items.filter(item => item.owner._id === props.user._id).map(item => (
    <div key={item._id}>
      <div>
      <Link to={`/items/${item._id}`}><img className="object-cover justify-center p-1 h-25 w-25 md:h-40 md:w-40 rounded hover:opacity-70" src={item.imgUrl} alt={item.title}/></Link>
      <h1 className="text-lg mt-1 hover:underline"><Link to={`/items/${item._id}`}>{item.title}</Link></h1>
      <div>{item.condition}</div>
      </div>
    </div>
    ))
  
  return (
    <div>
      <div className="text-2xl flex py-2 px-3 sm:px-10 m-3 sm:m-5 justify-center sm:justify-start align-text-top flex-wrap gap-3">My Stuff</div>
      <div className="flex py-2 px-3 sm:px-10 m-3 sm:m-5 justify-around align-text-top flex-wrap gap-8">
        {items}
      </div>
    </div>
  )
}
