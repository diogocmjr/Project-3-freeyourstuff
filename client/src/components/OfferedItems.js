import React from 'react'
import { Link }from 'react-router-dom'

export default function OfferedItems(props) {

  const items = props.items.filter(item => item.owner._id === props.user._id).map(item => (
    <div key={item._id}>
      <Link to={`/items/${item._id}`}><img className="object-cover h-40 w-40 rounded hover:opacity-70" src={item.imgUrl} alt={item.title}/></Link>
      <h1 className="text-lg mt-2 font-medium hover:underline"><Link to={`/items/${item._id}`}>{item.title}</Link></h1>
      <div>{item.condition}</div>
    </div>
    ))
  
  const username = props.user.username;

  return (
    <div className="flex flex-col mx-2 my-2">
       {props.dashboard ? <div className="text-2xl flex py-1 px-3 sm:px-10 m-3 sm:m-5 justify-center lg:justify-start">My Stuff:</div> : username && <div className="text-2xl flex py-1 px-3 sm:px-10 m-3 sm:m-5 justify-center lg:justify-start">{username.charAt(0).toUpperCase() + props.user.username.slice(1)}'s Stuff</div>}
      <div className="flex py-1 px-3 sm:px-10 m-3 sm:m-5 justify-around align-text-top text-center flex-wrap gap-8">
        {items}
      </div>
    </div>
  )
}
