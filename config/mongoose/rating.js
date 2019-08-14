const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rating: {
    type:Number,
    required: true,
    min: 1,
    max: 5
  },
  description: {
    type:String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  }
})
