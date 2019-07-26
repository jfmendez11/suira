//Here goes routes of backend http requests.
const jwtSecret = require('./config/passport/jwtConfig');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./config/mongoose/conf');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

