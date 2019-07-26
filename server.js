require('dotenv').config();
const express = require('express');
const backend = require('./backend');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const configDB = require('./config/mongoose/database.js');

mongoose.connect(configDB.url, {useNewUrlParser: true});

require("./config/passport/passport")(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

let testId;

app.listen(process.env.PORT || 5000, () => {
  testId=1;
  console.log(`Listening on :${process.env.PORT || 5000}`);
});