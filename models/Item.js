const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const itemSchema = new Schema({
  title: String,
  description: String,
  imgUrl: {
    type: String,
    default: 'https://res.cloudinary.com/dvzi6gpqd/image/upload/v1621455478/thing-gallery/placeholder_g0qzei.png'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  condition: {
    type: String,
    enum: ['New', 'As New', 'Used - Good', 'Used - Fair', 'N/A'],
    default: null
  },
  status: {
    type: String,
    enum: ['Available', 'Reserved'],
    default: 'Available'
  },
  coordinates: Array,
  postedDate: Date,
  category: {
    type: String,
    enum: ['Transports', 'Electronics', 'Family & Baby', 'House & Garden', 'Pets', 'Clothing & Accessories', 'Books', 'Music & Movies', 'Hobbies', 'Other'],
    default: null,
  }
});

const Item = model("Item", itemSchema);

module.exports = Item;