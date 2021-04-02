const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your full name.']
    },

     email: {
        type: String,
         required: [true, 'Please, provide a valid email address.'],
         unique: true
     },

    password: {
        type: String,
        required: [true, 'Please, provide a password for this email address.']
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('user', usersSchema);

module.exports = User;