const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bycrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/User'); 

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => { 
    res.send('about page')
});

router.get('/signin', (req, res) => {
    res.render('signin')  
})

router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/test ',
        failureRedirect: '/fail',
        failureFlash: true
    })(req, res, next);
}); 

router.get('/signup', (req, res) => {
    res.render('signup')
});
router.get('/fail', (req, res) => {
    res.send('failed to login')
});


router.post('/signup', async (req, res) => {

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
        res.send('error creating user');
        console.log(err);
     }
});

//testing route
router.get('/test', (req, res) => {
    res.send('test route');
});

router.get('/createpost', (req, res) => {
    res.render('createPost')
});

module.exports = router;