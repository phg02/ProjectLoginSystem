const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
const app = express();
const passport = require('passport');

//Routes
const indexRouter = require('./routes/indexRouter');




//Middleware
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb',extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//pasport config
require('./config/passport')(passport);

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

//passort middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req,res, next) =>{
    res.locals.error = req.flash('error');
    next();
})


//set up view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');




app.use('/', indexRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));