const mongoose = require('mongoose');

const userAccessSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    medium: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('UserAccess', userAccessSchema);