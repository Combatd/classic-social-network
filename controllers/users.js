const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

    const password = req.body.password;
    // hash a password in a generated salt


    const userDbEntry = {};
    // information will come from the form that follows the 
    // userSchema from models/users.js



    // we can actually add the user to the db here
    // set the username taken from the session to the new user's
    // username and then log the session as online


    

    // res.redirect('/posts');
});

router.post('/login', async (req, res) => {
    
    // will look to findUser in the database
    // will redirect if successful
    // it may send a message that username or password is incorrect
    // for either incorrect password or username
});

router.get('/logout', (req, res) => {
    
    // we will destroy the session here

});