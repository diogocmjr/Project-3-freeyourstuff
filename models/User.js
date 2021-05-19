const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true 
  },
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  location: {
    street: String,
    number: Number,
    city: String,
    country: String,
    postCode: String,
  },
  imgUrl: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  },
  favourites: Array
});

const User = model("User", userSchema);

module.exports = User;
