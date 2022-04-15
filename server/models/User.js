const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;