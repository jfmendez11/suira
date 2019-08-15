const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema({
  userId:{
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  invitationEmail:{
    type: String,
    required: true
  },
  toggled: {
    type: Boolean,
    required: true
  },
});

module.exports = mongoose.model('Invite', inviteSchema);
