const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');


// User - Profile (SHOW) page
router.get('/:id', (req, res) => {

    // Authors.findById(req.params.id)
    //     .populate({ path: 'articles' })
    //     .exec((err, foundAuthor) => {
    //         if (err) console.log(err);
    //         console.log(foundAuthor)

    //         res.render('authors/show.ejs', {
    //             author: foundAuthor
    //         });
    //     })

    User.findOne( { _id: req.params.id })
        .populate({ path: 'posts' })
        .exec((err, foundUser) => {
            if (err) {
                console.log(err)
                res.send(err);
            } else {
                res.render('profile.ejs', {
                    user: foundUser,
                });
            }
        });

    // User.findById(req.params.id, (err, foundUser) => {
    //     if(err) {
    //         console.log(err)
    //         res.send(err);
    //     } else {
    //         console.log(foundUser);
    //         res.render('profile.ejs', {
    //             user: foundUser
    //         });
    //     }
    // });

   
});


router.post('/registration', async (req, res) => {

    const existingUser = User.find({username: req.body.username})

    // if (existingUser) {
    //     res.send('That user name is already taken!')
    // } 

        const password = req.body.password;
        // hash a password in a generated salt
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const userDbEntry = {};
        // information will come from the form that follows the 
        // userSchema from models/users.js
        userDbEntry.username = req.body.username;
        userDbEntry.password = passwordHash;
        userDbEntry.email = req.body.email;
        userDbEntry.photo = req.body.photo;
        // we can actually add the user to the db here
        // set the username taken from the session to the new user's
        // username and then log the session as online
        const createdUser = await User.create(userDbEntry);
        console.log(createdUser);
        req.session.username = createdUser.username;
        req.session.logged = true;
        console.log(req.body);
        res.redirect('/posts');
    

    
});

router.post('/login', async (req, res) => {
    
    // will look to findUser in the database
    // will redirect if successful
    // it may send a message that username or password is incorrect
    // for either incorrect password or username

    // find if the user exits
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        console.log(req.body);
        // if User.findOne returns null/ or undefined it won't throw an error
        console.log(foundUser);
        if (foundUser) {

            if (bcrypt.compareSync(req.body.password, foundUser.password)) {

                req.session.message = '';
                
                console.log(foundUser);
                req.session.username = foundUser.username;
                req.session.logged = true;
                
                res.redirect('/posts')


            } else {
                req.session.message = 'Username or password is incorrect';
                console.log(req.session.message);
                res.redirect('/login');
            }


        } else {

            req.session.message = 'Username or password is incorrect';
            console.log(req.session.message);
            res.redirect('/login');
            // form is on /login
        }

    } catch (err) {
        res.send(err);
    }

});


// auth/logout

router.get('/logout', (req, res) => {
    
    // we will destroy the session here
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect('/');
        }
    })

});

module.exports = router; 