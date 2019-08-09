//Dependencies used for generating user database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Database model for users in Suira
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tag1: String,
    tag2: String,
    tag3: String,
    tag4: String,
    tag5: String,
    links: [String],
    location: String,
    phoneNumber: String,
    address: String,
    dateOfBirth: String,
    signUpDate: String,
    recomended: [String],
    acceptedTandC: Boolean,
    verifiedEmail: Boolean,
    acceptedPrivacy: Boolean,
});

//Generates hash function to store passwords encrypted
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Check if password is valid
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
};

//Export to use in the rest of the app
module.exports = mongoose.model('User', userSchema);