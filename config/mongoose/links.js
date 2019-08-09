const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    href: String,
    networkName: String,
});

module.exports = mongoose.model('Link', linkSchema);