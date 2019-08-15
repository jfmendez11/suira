const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  type:{
    type: String,
    required: true
  },
  userId:{
    type: String,
    required: true
  },
  read:{
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
