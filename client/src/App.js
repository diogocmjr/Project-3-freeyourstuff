import React from 'react'
import './App.css';
import { Route, Redirect } from 'react-router-dom';


import Signup from './components/Signup';
import Login from './components/Login'
import Home from './components/Home'


class App extends React.Component {

  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({ user })
  }

  render() {
    return (
      <>
        <Route exact path='/'
          render={props => <Home setUser={this.setUser} {...props} />}
        />

        <Route exact path='/signup'
          render={props => <Signup setUser={this.setUser} {...props} />}
        />

        <Route exact path='/login' 
          render={props => <Login setUser={this.setUser} {...props} />}
        />
      </>
    )
  }
}

export default App;
