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
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
            <Link to='/'><img className="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow">
               </img> </Link>
            </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-4 flex items-center md:ml-6">
                {props.user ? (
                  <div className="flex space-x-4">
                    <h4 className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <Link to='/profile'>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={props.user.imgUrl}
                      alt=""
                      /></Link></h4>
                    <h4><Link to='/' onClick={() => handleLogout()}>Log out</Link></h4>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <h4 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Link to='/signup'>Sign up</Link></h4>
                    <h4 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Link to='/login'>Log in</Link></h4>
                  </div>  
                )}
              </div>
            </div>  
        </div>
      </div>
    </nav>
  )
}