const mongoose = require('mongoose');

const searchesSchema = mongoose.Schema({
    search: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Search', searchesSchema);