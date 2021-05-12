const express = require('express');
const usersRouter = express.Router();
const multer = require('multer');
const sharp = require('sharp');

const User = require('../database/usersModel');
const authenticate =  require('../middleware/authenticate');
const admin = require("../middleware/admin");
const cloudinary = require('../utilities/cloudinary');

const upload =  multer({
    limits: {
        fileSize: 1000000
    },

    fileFilter(req, file, cb) {

        if(!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {

            return cb(new Error('Please, upload only jpg, jpeg, or png file'));
        }

        cb(undefined, true);
    }
});

usersRouter.get('/admin/users', authenticate, admin, async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

usersRouter.get('/admin/users/:id', authenticate, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error('User does not exists!');
            return res.status(404).json({ error: error.message });
        }
        const existingUser = user.hideSensitiveData(user);

        return res.status(200).json(existingUser);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

usersRouter.get('/users/me', authenticate, async (req, res) => {
   try {
       const { _id } = req.user;
       const user = await User.findById(_id);

       if (!user) {
           const error = new Error('This user does not exists');
           return res.status(404).json({ error: error.message });
       }

       const profile = user.hideSensitiveData(user);

       return res.status(200).json(profile);

   } catch (error) {

       return res.status(400).json({ error: error.message });
   }
});

usersRouter.patch('/admin/users/:id/edit', authenticate, admin, async (req, res) => {
   try {
       const user = await User.findById(req.params.id);
       if (!user) {
           const error = new Error('User not found!');
           return res.status(404).json({ error: error.message });
       }
       await User.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });
       return res.status(200).json();

   } catch (error) {
       return res.status(400).json({ error: error.message });
   }
});

usersRouter.patch('/users/update/profile', authenticate, async (req, res) => {
   try {
       const _id = req.user._id;

       const profile = await User.findByIdAndUpdate(_id, req.body, { new: true, useFindAndModify: false});

       const updatedProfile = profile.hideSensitiveData(profile);

       return res.status(200).json(updatedProfile);

   } catch (error) {

       return res.status(400).json({ error: error.message });
   }
});

usersRouter.post('/users/register', async (req, res) => {
    try {
        const { email } = req.body;
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            const error = new Error('This is email address exists! Please, sign in or enter another valid email address.');
            return res.status(422).json({ error: error.message });
        }

        const newUser = new User(req.body);
        await newUser.save();

        const token = newUser.generateToken(newUser._id);
        const cookieOption = newUser.generateValidCookieOption();
        res.cookie('jwtCookie', token, cookieOption);
        newUser.token = token;
        await newUser.save({ validateBeforeSave: false });

        const loggedInUser = newUser.hideSensitiveData(newUser);
        return res.status(200).json(loggedInUser)

        return res.status(201).json(newUser);

    } catch (error) {

        return res.status(400).json({ error: error.message });
    }
});

usersRouter.post('/users/login', async (req, res) => {
   try {
       const { email, password } = req.body;

       if (!email || !password) {
           const error = new Error('Please, enter both your email and passord!');
           return res.status(422).json({ error: error.message });
       }

       const exisitngUser = await User.findOne({ email });

       if (!exisitngUser) {
           const error = new Error('Invalid email or password!');
           return res.status(401).json({ error: error.message });
       }

       const passwordMatched = await exisitngUser.comparePasswords(password, exisitngUser.password);

       if (!passwordMatched) {
           const error = new Error('Invalid email or password!');
           return res.status(401).json({ error: error.message });
       }

       const token = exisitngUser.generateToken(exisitngUser._id);
       const cookieOption = exisitngUser.generateValidCookieOption();
       res.cookie('jwtCookie', token, cookieOption);
       exisitngUser.token = token;
       await exisitngUser.save({ validateBeforeSave: false });

       const loggedInUser = exisitngUser.hideSensitiveData(exisitngUser);
       return res.status(200).json(loggedInUser)

   } catch (error) {

       return res.status(400).json({ error: error.message });
   }
});

usersRouter.post('/users/logout', authenticate, async (req, res) => {
   try {
       const { _id } = req.user;
       const user = await User.findById(_id);
       user.token = undefined;
       await user.save({ validateBeforeSave: false });

       const inValidCookieOption = user.generateInValidCookieOption();
       res.cookie('jwtCookie', null, inValidCookieOption);

       const signedOutUser = user.hideSensitiveData(user);

       return res.status(200).json(signedOutUser);

   } catch (error) {
       return res.status(400).json({ error: error.message });
   }
});

usersRouter.delete('/admin/users/:id', authenticate, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error('User not found');
            return res.status(404).json({ error: error.message });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = usersRouter;
