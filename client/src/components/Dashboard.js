
import React, { useEffect } from 'react'
import OfferedItems from './OfferedItems'
import WishList from './WishList'

export default function Dashboard(props) {    
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>     
      {props.message && (
        <div className="flex justify-center my-4">
          <div className="w-6/12 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{props.message}</strong>
            <button onClick={() => props.removeMessage()} className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-3 mr-4 outline-none focus:outline-none">
              <span>×</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="flex flex-row p-5">
        <div className="mx-5">
          <img className="object-cover h-40 w-40 mx-10 my-2 rounded-full" src={props.user.imgUrl} alt=""/>
          {props.user.firstName ? <h1 className="text-3xl mx-10 my-5 text-center">{props.user.firstName} {props.user.lastName}</h1> : <h1 className="text-3xl mx-10 my-5">{props.user.username}</h1>}
          {props.user.location && <h2 className="text-xl mx-10 my-5 text-center">{props.user.location.city}, {props.user.location.country}</h2>}      
        </div>

        <div className="flex flex-col">
          <div>
            <OfferedItems user={props.user} items={props.items} condition={props.condition} status={props.status} category={props.category}/>
          </div>
          <div>
            <WishList user={props.user} items={props.items} condition={props.condition} status={props.status} category={props.category}/>
          </div>
        </div>
      </div>
    </div>
  )
}

