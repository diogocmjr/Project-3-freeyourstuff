import React, { Component } from 'react'
import { login } from '../services/auth';

export default class Login extends Component {

  state = {
    username: '',
    password: '',
    message: ''
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    login(username, password)
      .then(response => {
        if (response.message) {
          this.setState({
            message: response.message,
            username: '',
            password: ''
          })
        } else {
          this.props.setUser(response);
          this.props.history.push('/');
        }
      })
  }

  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
          <img
            className="mx-auto h-18"
            src="/fys_icon.svg"
            alt="Workflow"
          />
          <h2 className="mt-3 text-center text-3xl font-bold text-gray-800">Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={this.handleSubmit}>
          <label className="sr-only" htmlFor="username">Username: </label>
          <input
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="password" className="sr-only">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>Log in</button>
          {this.state.message && (
            <h3>{this.state.message}</h3>
          )}
        </form>
        </div>
      </div>
    )
  }
}