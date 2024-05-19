const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false
    },
    profile:{
        type: String,
        default: '/images/profile.jpeg'
    },
    theme: {
        type: String,
        default: 'light'
    },
    activated: {
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;