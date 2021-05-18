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
        <div className="flex flex-row p-5">
        <div className="mx-5">
          <img className="object-cover h-40 w-40 mx-10 my-2 rounded-full" src={this.state.person.imgUrl} alt=""/>
          {this.state.person.firstName ? <h1 className="text-3xl mx-10 my-5 text-center">{this.state.person.firstName} {this.state.person.lastName}</h1> : <h1 className="text-3xl mx-10 my-5">{this.state.person.username}</h1>}
          {this.state.person.location && <h2 className="text-xl mx-10 my-5 text-center">{this.state.person.location.city}, {this.state.person.location.country}</h2>}      
        </div>

        <div>
        <OfferedItems user={this.state.person} items={this.props.items} condition={this.props.condition} status={this.props.status} category={this.props.category}/>
        </div>
      </div>
      </div>
    )
  }
}
