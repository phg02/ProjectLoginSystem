const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bycrypt = require('bcryptjs');
const passport = require('passport');
// const connectEnsureLogin = require('connect-ensure-login');

const { forwardAuthenticated, ensureAuthenticated, ensureAuthenticatedAdmin} = require('../config/auth');

const User = require('../models/User'); 


// let hehe =async ()=>{
//     let adminPassword = await bycrypt.hash('M@tkhau123', 10);
//     const admin = new User({
//         username: 'admin',
//         email: 'admin@gmail.com',
//         password: adminPassword,
//         admin: true,
//     })
//     await admin.save();
//     console.log(admin);
// }
// hehe();


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

router.get('/admin',ensureAuthenticated, ensureAuthenticatedAdmin,(req, res) => {
    res.send('admin');
})

//testing route
router.get('/test',ensureAuthenticated,(req, res) => {
    if(req.user.admin===true) {
        res.send('admin');
        return;
    }
    console.log('testRoute entered');
    res.render('logout');
});

router.get('/community',ensureAuthenticated ,(req, res) => {
    res.render('community', {user: req.user});
});
router.get('/setting',ensureAuthenticated ,(req, res) => {
    console.log('user current theme '+req.user.theme);
    res.render('setting', {user: req.user});
});
router.put('/updatetheme',ensureAuthenticated, async (req, res)=>{
    let user = await User.findById(req.user.id);
    console.log('update theme')
    console.log(req.body.switchTheme);
    if(req.body.switchTheme){
        console.log('dark');
        user.theme = 'dark';
    }
    else{
        console.log('light');
        user.theme = 'light';
    }
    await user.save();
    res.redirect('/setting');
})

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