const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema({
    userId: String,
    postDate: String,
    imagePath: String,
    views: Number,
    title: String,
    description: String,
    industries: [String],
    location: String,
    payment: String,
    oppDate: String,
});

module.exports = mongoose.model('Opportunity', opportunitySchema);