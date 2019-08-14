const mongoose = require('mongoose');

const appliedSchema = mongoose.Schema({
  userId:{
    type: String
    required: true
  },
  opportunityId: {
    type: String
    required: true
  },
  ratingId:{
    type: String
    required: true
  },
  selected: {
    type: String
    required: true
  },
  timestamp: {
    type: String
    required: true
  },
});

module.exports = mongoose.model('Applied', appliedSchema);
