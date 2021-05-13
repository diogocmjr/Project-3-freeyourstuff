import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/auth'

export default function Navbar(props) {
  
  const handleLogout = () => {
    logout().then(() => {
      props.setUser(null);
    })
  }

  //write function to get image from user profile -> avatar

  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        {props.user ? (
          // <li><Link to='/profile'><img src="" alt="user image" /></Link></li>
          <>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/' onClick={() => handleLogout()}>Log out</Link></li>
          </>  
        ) : (
          <>
            <li><Link to='/signup'>Sign up</Link></li>
            <li><Link to='/login'>Log in</Link></li>
          </>  
        )}
      </ul>
    </nav>
  )
}

