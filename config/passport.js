const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const User = require('../models/User');
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            await User.findOne({ email: email })
                .then(async(user) => {
                    if (!user) {
                        return done(null, false, { message: 'No user with that email' });
                    }
                    try{
                        if(await bcrypt.compare(password, user.password)){
                            return done(null, user);
                        }
                        else{
                            console.log('Password incorrect');
                            return done(null, false, { message: 'Password incorrect' });
                        }
                    }
                    catch(err){
                        console.log(err);
                    }
                })

        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then((err, user) => {
                done(err, user);
            });
    });
}