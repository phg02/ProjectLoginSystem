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

//testing route for array
router.get('/array', async (req, res) => {
    let id = [];
    let all = await User.find()
                    .then(users =>{
                        users.forEach(user => {
                            id.push(user.id);
                        })
                    })
    console.log(id);
    
    // all.forEach(user => {
    //     id.push(user.id);
    // })
    // for(let user of all){
    //     id.push(user.id);
    // }
    // console.log(id);
    res.send('array');
})


//update username
router.put('/updateUsername',ensureAuthenticated, async (req, res) => {
    try{
        if(req.body.username === ''){
            throw new Error('username cannot be empty');
        }
        let user = await User.findById(req.user.id);
        user.username = req.body.username;
        console.log('update username');
        await user.save();
        res.redirect('/setting');
    }
    catch{
        res.send('error');
    }
   
});

//update password
router.put('/updatePassword',ensureAuthenticated, async (req, res) => {
    try{
        //find user old password
        let userChange = await User.findById(req.user.id);
        //check if old password is correct
        if(await bycrypt.compare(req.body.oldPassword, userChange.password)){
            userChange.password = await bycrypt.hash(req.body.newPassword, 10);
           
        }
        else{
            throw new Error('wrong password');
        }
        //check if new password is empty
        if(req.body.newPassword === ''){
            throw new Error('New password cannot be empty');
        }
        //check if new password is less than 8 characters
        if(req.body.newPassword.length < 8){
            throw new Error('New password must be at least 8 characters');
        }
        //check if new password and confirm password match
        if(req.body.newPassword != req.body.confirmPassword){
            throw new Error('new passwords do not match');
        }
        //check if new password is same as old password
        if(req.body.old === req.body.newPassword){
            throw new Error('New password cannot be same as old');

        }
        await userChange.save();
        res.render('successSetting', {user: req.user});
    }
    catch(err){
        res.render('settingError', {user: req.user ,error: err.message});
    }
    

});


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