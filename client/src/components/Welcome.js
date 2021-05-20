import React from 'react'

export default function Welcome(props) {
  return (
    <div className="welcome" style={{backgroundImage: "url('./chair.jpg')"}}>
      <h1 className="mt-24 lg:mt-0 text-4xl sm:text-7xl font-medium">Free Your Stuff</h1>
      <h3 className="mt-4 text-lg sm:text-2xl text-center">Get rid of the stuff you don't want anymore, for free!</h3>
    </div>
  )
}
