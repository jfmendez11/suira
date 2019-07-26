const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcryptjs');

const BCRYPT_SALT_ROUNDS = 12;

const localStrategy = require('passport-local').Strategy,
    JWTstrategy = require('passport-jwt').Strategy,
    User = require('../mongoose/conf'),
    ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
    passport.use(
        'register',
        new localStrategy (
            {
                usernameField: 'email',
                passwordField: 'password',
                session: false,
            },
            (email, password, done) => {
                try {
                    User.findOne({'email': email})
                        .then((user) => {
                            if (user) {
                                console.log('username already taken');
                                return done(null, false, {message: 'The username already exists', auth: false})
                            } else {
                                let newUser = new User();
                                newUser.email = email;
                                newUser.password = newUser.generateHash(password);
                                newUser.save((err) => {
                                    if (err) throw err;
                                    return done(null, newUser);
                                });
                            }
                        });
                } catch (err) {
                    done(err);
                }
            },
        )
    );

    passport.use(
        'login',
        new localStrategy(
            {
                usernameField: 'email',
                passwordFiel: 'password',
                session: false,
            },
            (email, password, done) => {
                console.log(email);
                try {
                    User.findOne({email: email})
                        .then((user) => {
                            if (user === null) {
                                return done(null, false, {
                                    message: 'Usernarme and/or password are incorrect',
                                    auth: false,
                                });
                            } else {
                                bcrypt.compare(password, user.password)
                                    .then((response) => {
                                        if (!response) {
                                            console.log('passwords do not match');
                                            return done(null, false, {
                                                message: 'Usernarme and/or password are incorrect',
                                                auth: false,
                                            });
                                        }
                                        console.log('user found and authenticated');
                                        return done(null, user);
                                    });
                            }
                        });
                } catch (err) {
                    done(err);
                }
            },
        )
    );

    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret.secret,
    };

    passport.use(
        'jwt',
        new JWTstrategy(opts, (jwt_payload, done) => {
            try {
                user.findOne({_id: jwt_payload.id})
                    .then((user) => {
                        if (user) {
                            console.log('user found in db in passport');
                            done(null, user);
                        } else {
                            console.log('user not found in db');
                            done(null, false);
                        }
                    });
            } catch (err) {
                done(err);
            }
        })
    );
};