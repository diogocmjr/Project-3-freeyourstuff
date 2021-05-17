import React from 'react'
import './App.css';
import { Route } from 'react-router-dom';
import axios from 'axios'


import Signup from './components/Signup';
import Login from './components/Login'
import Home from './components/Home'
import New from './components/New'
import Navbar from './components/Navbar'
import ItemDetails from './components/ItemDetails'
import Dashboard from './components/Dashboard'
import EditProfile from './components/EditProfile'

class App extends React.Component {

  state = {
    user: this.props.user,
    items: [],
    message: ''
  }

  setUser = user => {
    this.setState({ user })
  }

  getData = () => {
    axios.get('/api/items')
      .then(response => {
        this.setState({
          items: response.data
        })
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getData();
  }

  getUser = () => {
    axios.get('/api/auth/loggedin')
      .then(response => {
        this.setState({
          user: response.data
        })
      })
  }

  updateMessage = (message) => {
    this.setState({
      message: message
    })
  }

  removeMessage = () => {
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <>
        <Navbar className="z-100" user={this.state.user} setUser={this.setUser}/>
        <Route exact path='/profile'
          render={props => <Dashboard removeMessage={this.removeMessage} message={this.state.message} items={this.state.items} user={this.state.user} {...props} />}
        />

        <Route exact path='/profile/edit'
          render={props => <EditProfile updateMessage={this.updateMessage} getUser={this.getUser} user={this.state.user} {...props} />}
        />

        <Route exact path='/'
          render={props => <Home items={this.state.items} user={this.state.user} setUser={this.setUser} {...props} />}
        />

        <Route exact path='/signup'
          render={props => <Signup setUser={this.setUser} {...props} />}
        />

        <Route exact path='/login' 
          render={props => <Login setUser={this.setUser} {...props} />}
        />

        <Route exact path='/new'
          render={props => <New getData={this.getData} user={this.state.user} setUser={this.setUser} {...props} />}
        />

        <Route path='/items/:id'
          render={props => <ItemDetails getData={this.getData} user={this.state.user} setUser={this.setUser} {...props} />}
        />
      </>
    )
  }
}

export default App;
