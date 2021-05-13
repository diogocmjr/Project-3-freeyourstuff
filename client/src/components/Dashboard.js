//create item, edit profile, render profile

import React from 'react'
import { Link } from 'react-router-dom'
import OfferedItems from './OfferedItems'

export default function Dashboard(props) {  

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to='/profile/edit'>Edit profile</Link>
      <OfferedItems items={props.items} user={props.user}/>
    </div>
  )
}
