const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  currAdd: {
    type: String,
    required: true
  },
  currCountry: {
    type: String,
    required: true
  },
  currState: {
    type: String,
    required: true
  },
  currCity: {
    type: String,
    required: true
  },
  currZip: {
    type: String,
    required: true
  },
  destAdd: {
    type: String,
    required: true
  },
  destCountry: {
    type: String,
    required: true
  },
  destState: {
    type: String,
    required: true
  },
  destCity: {
    type: String,
    required: true
  },
  destZip: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Posts', PostSchema);
