import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/auth'
import { Disclosure, Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar(props) {
  
  const handleLogout = () => {
    logout().then(() => {
      props.setUser(null);
    })
  }

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center sm:items-stretch justify-start">
            <div className="flex-shrink-0 flex items-center">
            <Link to='/'><img className="h-7 sm:h-9"
                src="/fys_logo.svg"
                alt="logo">
               </img> </Link>
            </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                {props.user ? (
                  <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-left sm:static">
                          <button className="flex text-gray-100 bg-gray-600 hover:bg-gray-100 hover:text-gray-700 px-3 py-2 rounded-md font-medium mr-5" type="submit"><Link to='/new'>Add Item</Link></button>
                        </div>
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="object-cover h-9 w-9 rounded-full"
                              src={props.user.imgUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <Link 
                                to='/dashboard'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/dashboard/edit"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/'
                                onClick={() => handleLogout()}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Log out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
                ) : (
                  <div className="flex space-x-4">
                    <h4 className="text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Link to='/signup'>Sign up</Link></h4>
                    <h4 className="text-gray-700 bg-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><Link to='/login'>Log in</Link></h4>
                  </div>  
                )}
              </div>
            </div>  
        </div>
      </div>
    </Disclosure>
  )
}