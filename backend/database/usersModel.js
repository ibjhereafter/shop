const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    },
    image: String,

    token: String

}, {
    timestamps: true
});

usersSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    user.password = await bcrypt.hash(user.password, 12);

    return next();

});

usersSchema.methods.comparePasswords = async function (enteredPassword, existingPassword) {
    return await bcrypt.compare(enteredPassword, existingPassword);
};

usersSchema.methods.hideSensitiveData = function(user) {
    user.password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined
    user.__v = undefined;
    user.token = undefined;

    return user;
}

usersSchema.methods.generateToken = function (_id) {

    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
};

usersSchema.methods.generateValidCookieOption = function () {
    const validity = 1000 * 60 * 60;
    return {
        maxAge: validity,
        httpOnly: true,
        path: '/',
        sameSite: 'lax'
    };
};

usersSchema.methods.generateInValidCookieOption = function () {
    const validity =  -1000 * (60 * 60);
    return {
        maxAge: validity,
        httpOnly: true,
        path: '/',
        sameSite: 'lax'
    };
};

const User = mongoose.model('user', usersSchema);

module.exports = User;