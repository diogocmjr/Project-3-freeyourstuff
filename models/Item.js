const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const itemSchema = new Schema({
  name: String,
  description: String,
  imgUrl: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['Available', 'Reserved'],
    default: 'Available'
  },
  postedDate: Date,
  category: {
    type: String,
    enum: ['Transports', 'Electronics', 'Family & Baby', 'House & Garden', 'Pets', 'Clothing & Accessories', 'Books, Music & Movies', 'Hobbies', 'Other'],
    default: null,
  }
});

const Item = model("Item", itemSchema);

module.exports = Item;