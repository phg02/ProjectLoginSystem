const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bycrypt = require('bcryptjs');
const passport = require('passport');
// const connectEnsureLogin = require('connect-ensure-login');

const {connectEnsureLogin, forwardAuthenticated, ensureAuthenticated} = require('../config/auth');

const User = require('../models/User'); 


router.get('/', forwardAuthenticated ,(req, res) => {
    res.render('index');
});

router.get('/about',forwardAuthenticated, (req, res) => { 
    res.send('about page')
});

router.get('/signin', forwardAuthenticated,(req, res) => {
    res.render('signin')  
})

router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/test',
        failureRedirect: '/signin',
        failureFlash: true,
    })(req, res, next);
    // res.json({
    //     message: 'success'
    // })
    console.log('test');
}); 

//testing route
router.get('/test',ensureAuthenticated,(req, res) => {
    console.log('testRoute entered');
    res.render('logout');
});

// router.get('/logout',(req, res) => {
//     req.logout();
//     res.redirect('/signin');
// })

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

router.get('/signup', (req, res) => {
    res.render('signup')
});
router.get('/fail', (req, res) => {
    res.send('failed to login')
});


router.post('/signup', forwardAuthenticated,async (req, res) => {

    // check if any fields are empty
    if(req.body.username === '' || req.body.email === '' || req.body.password === '' || req.body.confirm === '') {
        res.redirect('/signup');
    }
    if(req.body.password.length < 8) {
        res.redirect('/signup');
    };
    if(req.body.password !== req.body.confirm) {
        res.redirect('/signup');
    }

    //saving user to database       
    try {
        // check if email is already in use
        const dbemail = await User.findOne({email: req.body.email});
        // console.log(`email check ${dbemail}`);
        if(dbemail){
            throw new Error ('email already in use');
        }
        const hashedPassword = await bycrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        // console.log(newUser);
        await newUser.save();
        res.send('created');
    }
    catch(err) { 
        res.render('signupError');
        // console.log(err);
     }
});



router.get('/createpost', (req, res) => {
    res.render('createPost')
});

module.exports = router;