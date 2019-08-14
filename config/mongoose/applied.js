const mongoose = require('mongoose');

const appliedSchema = mongoose.Schema({
  userId: String,
  opportunityId: String,
  ratingId: String,
  selected: Boolean,
  timestamp: String
});

module.exports = mongoose.model('Applied', appliedSchema);
