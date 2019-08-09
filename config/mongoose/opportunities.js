const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema({
    userId: String,
    postDate: String,
    title: String,
    description: String,
    ind1: String,
    ind2: String,
    ind3: String,
    ind4: String,
    ind5: String,
    location: String,
    payment: Number,
    startDate: String,
    endDate: String,
});

module.exports = mongoose.model('Opportunity', opportunitySchema);