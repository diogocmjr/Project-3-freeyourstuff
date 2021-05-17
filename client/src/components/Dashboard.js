//create item, edit profile, render profile

import React from 'react'
import { Link } from 'react-router-dom'
import OfferedItems from './OfferedItems'

export default function Dashboard(props) {  

  return (
    <div>
      <h1 className="text-3xl mx-10 my-5">{props.user.firstName} {props.user.lastName}</h1>
      <img className="h-40 w-40 mx-10 my-2 rounded-full" src={props.user.imgUrl} alt=""/>
      <Link className="text-sm mx-20" to='/profile/edit'>Edit profile</Link>
      <h2 className="text-xl mx-10 my-5">{props.user.location.city}, {props.user.location.country}</h2>
      <OfferedItems items={props.items} user={props.user}/>
    </div>
  )
}
