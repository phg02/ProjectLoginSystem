const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
require('dotenv').config();
const app = express();


//Routes
const indexRouter = require('./routes/indexRouter');




//Middleware
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb',extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//set up view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');




// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));
app.use('/', indexRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));