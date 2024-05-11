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
    theme: {
        type: String,
        default: 'light'
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;