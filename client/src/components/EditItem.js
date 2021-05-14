import React, { Component } from 'react'

export default class EditItem extends Component {
  render() {
    return (
      <div className="flex-col">
        <h1 className="flex justify-center mt-6 mb-4 text-3xl font-bold text-gray-900">Edit this item</h1>
        <form onSubmit={this.props.handleSubmit}>
        <div className="flex-col my-2">
          <div><label className="text-xs" htmlFor="title">Title</label></div>
          <input
            className="w-80 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            type="text"
            id="title"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
          />
          </div>
          <div className="flex-col my-2">
          <div><label className="text-xs" htmlFor="category">Category</label></div>
          <select className="w-80 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="category" id="category" value={this.props.category} onChange={this.props.handleChange}>
            <option value="Category">Category</option>
            <option value="Books">Books</option>
            <option value="Clothing & Accessories">Clothing & Accessories</option>
            <option value="Electronics">Electronics</option>
            <option value="Family & Baby">Family & Baby</option>
            <option value="Hobbies">Hobbies</option>
            <option value="House & Garden">House & Garden</option>
            <option value="Music & Movies">Music & Movies</option>
            <option value="Pets">Pets</option>
            <option value="Transports">Transports</option>
            <option value="Other">Other</option>
          </select>
          </div>
          <div className="flex-col my-2">
          <div><label className="text-xs" htmlFor="description">Description</label></div>
          <textarea
            className="w-80 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            type="text"
            id="description"
            name="description"
            value={this.props.description}
            onChange={this.props.handleChange}
          />
          </div>
          <div className="flex-col my-2">
          <div><label className="text-xs" htmlFor="condition">Condition</label></div>
          <select className="w-80 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="condition" id="condition" value={this.props.condition} onChange={this.props.handleChange}>
            <option value="Condition">Condition</option>
            <option value="New">New</option>
            <option value="As New">As New</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Fair">User - Fair</option>
          </select>
          </div>
          <div className="flex-col my-2">
          <div><label className="text-xs" htmlFor="status">Status</label></div>
          <select className="w-80 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" name="status" id="status" value={this.props.status} onChange={this.props.handleChange}>
          <option value='Available'> Available</option>
          <option value='Reserved'>Reserved</option>
        </select>
        </div>
        <div>
          <label className="text-xs my-2" htmlFor="image_upload">Upload Image</label>
          <input className="flex items-center ml-1 w-80" type="file" name='imgUrl' onChange={e => this.props.handleFileUpload(e)} />
        </div>
        {/* <div className="flex justify-center my-2"> */}
          <button className="relative w-80 my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Update Item</button>
        {/* </div> */}
        </form>
      </div>
    )
  }
}