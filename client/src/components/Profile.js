import React, { Component } from 'react'
import axios from 'axios'
import OfferedItems from './OfferedItems'

export default class Profile extends Component {
  
  state = {
    person: ''
  }
  
  getPerson = () => {
    axios.get(`/api/person/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          person: response.data
        })
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: 'Not found 🤷‍♀️🤷‍♂️'
          })
        }
      })
  }

  componentDidMount() {
    this.getPerson();
  }
  
  render() {
    return (
      <div>
        <div className="flex flex-row p-5 ml-2">
        <div className="flex flex-col mx-1 my-2 items-center">
          <img className="object-cover w-40 h-40 mx-5 my-5 rounded-full" src={this.state.person.imgUrl} alt=""/>
          {this.state.person.firstName ? <h1 className="sm:text-2xl md:text-3xl text-xl mt-4 mb-2 text-center">{this.state.person.firstName} {this.state.person.lastName}</h1> : <h1 className="text-3xl mx-10 my-5">{this.state.person.username}</h1>}
          {this.state.person.location && <h2 className="sm:text-lg md:text-xl text-base mx-10 my-2 text-center">{this.state.person.location.city}, {this.state.person.location.country}</h2>}      
        </div>

        <div>
        <OfferedItems dashboard={false} user={this.state.person} items={this.props.items} condition={this.props.condition} status={this.props.status} category={this.props.category}/>
        </div>
      </div>
      </div>
    )
  }
}
