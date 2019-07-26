require('dotenv').config();
const express = require('express');
const backend = rquire('./backend');
const path = require('path');
const bodyParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let testId;

app.listen(process.env.PORT || 5000, () => {
  testId=1;
  console.log(`Listening on :${process.env.PORT || 5000}`);
});