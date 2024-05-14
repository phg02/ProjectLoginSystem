const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { get } = require('mongoose');

module.exports = (passport) => {
    try {
        console.log('passport config');
        passport.use(
            new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
                const user = await User.findOne({ email: email });
                if (!user) {
                    console.log('No user with that email');
                    return done(null, false, { message: 'No user with that email' });
                }

                // if ( !bcrypt.compare(user.password, password)) {
                //     console.log('Password incorrect');
                //     return done(null, false, { message: 'Password incorrect' });
                // }
                // console.log(password);
                // console.log(user.password);
                // console.log(bcrypt.compare(user.password, password));
                // console.log('user found');
                // return done(null, user, { message: 'Logged in successfully' });
                // 
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                        // return "logged in";
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            })
        );
        passport.serializeUser((user, done) => {
            // console.log(`serial ${user.id}`);
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            // console.log(id);
            User.findById(id)
                .then((user) => {
                    // console.log(user)
                    done(null, user);
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        // passport.deserializeUser((id, done) =>{
        //     return done(null, User.findById(id));}
        // );
    }

    catch (e) {
        console.log('error');
        return done(e);
    }

}