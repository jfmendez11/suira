const jwtSecret = require('../config/passport/jwtConfig');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../config/mongoose/conf');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_SES_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.signUpUser = (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) console.log(err);
        if (info !== undefined) {
            console.log(info.message);
            res.send(info);
        } else {
            req.logIn(user, err => {
                const data = {
                    name: req.body.name,
                    email: req.body.email,
                    tag1: req.body.tag1,
                    tag2: req.body.tag2 ? req.body.tag2 : null,
                    tag3: req.body.tag3 ? req.body.tag3 : null,
                    tag4: req.body.tag4 ? req.body.tag4 : null,
                    tag5: req.body.tag5 ? req.body.tag5 : null,
                    links: req.body.links,
                    location: req.body.location,
                    phoneNumber: req.body.phoneNumber,
                    dateOfBirth: req.body.dateOfBirth,
                    signUpDate: `${new Date().getDate()}/${new Date().getMonth()}/${new Date.getFullYear()}`,
                    recommended: req.body.recommended,
                    acceptedTandC: req.body.acceptedTandC,
                    verifiedEmail: false,
                    acceptedPrivacy: req.body.acceptedPrivacy
                };
                //Missing: send verification email
                User.findOne({email: data.email})
                    .then((user) => {
                        User.updateOne({
                            name: data.name,
                            industries: data.industries
                        })
                        .then(() => {
                            console.log('user created in db');
                            const token = jwt.sign({id: user._id}, jwtSecret.secret, {expiresIn: '1h'});
                            return res.status(200).send({
                                message: null,
                                auth: true,
                                token: token,
                                id: user._id
                            });
                        });
                    });
            });
        }
    })(req, res, next);
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.send(info);
        } else {
            req.logIn(user, err => {
                User.findOne({email: req.body.email}).then(user => {
                    const token = jwt.sign({id: user._id}, jwtSecret.secret, {expiresIn: '2h'});
                    return res.status(200).send({
                        auth: true,
                        token: token,
                        message: null,
                        id: user._id
                    });
                });
            });
        }
    })(req, res, next);
};

exports.findUser = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            return res.status(400).send("Unauthorized");
        } else {
            console.log('user found in db from route');
            return res.status(200).send({
                user
            });
        }
    })(req, res, next);
};

//Missing. Need to check passport's api to edit a profile
exports.updateProfile = (req, res, next) => {

};