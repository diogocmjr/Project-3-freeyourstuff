import React, { Component } from 'react'
import axios from 'axios'

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
        <h1>This is the profile page (not dashboard)</h1>
        <h1>{this.state.person.username}</h1>
      </div>
    )
  }
}
