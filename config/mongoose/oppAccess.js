const mongoose = require('mongoose');

const oppAccessSchema = mongoose.Schema({
    oppId: {
        type: String,
        required: true,
    },
    medium: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('OppAccess', oppAccessSchema);