const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => { 
    res.send('about page')
});

router.get('/signin', (req, res) => {
    res.render('signin')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});
router.get('/createpost', (req, res) => {
    res.render('createPost')
});

module.exports = router;