const mongoose = require('mongoose');

const tagsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Tag', tagsSchema);