const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (passport) => {
    try {
        console.log('passport config');
        const result = await passport.use(
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
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                }); 
            })
        );
        // console.log(result);
        console.log('ok');
    }
    catch(e) {
        console.log('error');
        return done(e);
    }
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