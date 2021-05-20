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
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import EditItem from './components/EditItem'
import ProtectedRoute from './components/ProtectedRoute'

class App extends React.Component {

  state = {
    user: this.props.user,
    items: '',
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
    this.getUser();
  }

  getUser = () => {
    axios.get(`/api/user/${this.props.user._id}`)
      .then(response => {
        this.setState({
          user: response.data
        })
      })
      .catch(err => console.log(err))
  }

  updateMessage = (message) => {
    this.setState({
      message: message
    })
    setTimeout(
      () => this.setState({ message: '' }), 
      3000
    );
  }

  removeMessage = () => {
    this.setState({
      message: '',    
    })
  }

  render() {
    return (
      <>
        <Navbar user={this.state.user} setUser={this.setUser}/> 

        <ProtectedRoute
          path='/dashboard'
          user={this.state.user}
          removeMessage={this.removeMessage} 
          message={this.state.message}
          updateMessage={this.updateMessage}
          getUser={this.getUser}
          items={this.state.items}
          component={Dashboard}
          redirectPath='/login'
        />

        <ProtectedRoute
          path='/dashboard/edit'
          user={this.state.user}
          updateMessage={this.updateMessage}
          getUser={this.getUser}
          items={this.state.items}
          component={EditProfile}
          redirectPath='/login'
        />

        <Route exact path='/profile/:id'
          render={props => <Profile items={this.state.items} user={this.state.user} {...props} />}
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

        <Route exact path='/items/:id'
          render={props => <ItemDetails user={this.state.user} getUser={this.getUser} getData={this.getData} updateMessage={this.updateMessage} {...props} />}
        />

        <ProtectedRoute
          path='/items/:id/edit'
          user={this.state.user}
          updateMessage={this.updateMessage}
          component={EditItem}
          redirectPath='/login'
        />
      </>
    )
  }
}

export default App;
