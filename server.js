require('dotenv').config();
const express = require('express');
const users = require('./backend/usersCRUD');
const opportunities = require('./backend/opportunitiesCRUD');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const configDB = require('./config/mongoose/database.js');

const appliedRoutes = require('./routes/applied');
const ratingRoutes = require('./routes/rating');
const inviteRoutes = require('./routes/invite');
const suggestionRoutes = require('./routes/suggestion');

mongoose.connect(configDB.url, {useNewUrlParser: true});

require("./config/passport/passport")(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

let testId;

app.post('/API/signUpUser', (req, res, next) => {
  users.signUpUser(req, res, next)
});

app.post('/API/loginUser', (req, res, next) => {
  users.loginUser(req, res, next);
});

app.get('/API/getUser', (req, res, next) => {
  users.findUser(req, res, next);
});

app.use('/API/applieds', appliedRoutes);
app.use('/API/ratings', ratingRoutes);
app.use('/API/invites', inviteRoutes);
app.use('/API/suggestions', suggestionRoutes);

app.listen(process.env.PORT || 5000, () => {
  testId=1;
  console.log(`Listening on :${process.env.PORT || 5000}`);
});
