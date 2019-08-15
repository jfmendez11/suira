const mongoose = require('mongoose');

const suggestionSchema = mongoose.Schema({
  userId:{
    type: String,
    required: true
  },
  text:{
    type: String,
    required: true
  },
  rating:{
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Suggestion', suggestionSchema);
