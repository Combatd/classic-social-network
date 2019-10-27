const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Post = require('../models/posts');
const Comment = require('../models/comments');

// Posts - Index
router.get('/', (req, res) => {
    console.log(req.session);
    Post.find({}, (err, foundPosts) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('posts/index.ejs', {
                posts: foundPosts
            });
        }
    });
});

// Posts - New

// A USER OBJECT LOOKS LIKE THIS { "_id" : ObjectId("5db4c013bf1e602f406ab83b"), "posts" : [], "favorites" : [], "username" : "testuser", "password" : "testpassword", "email" : "testemail@email.com", "date" : ISODate("2019-10-26T21:52:19.229Z"), "__v" : 0 }

router.get('/new', (req, res) => {
   // find if the user exists
    const currentUser = User.findOne({ "username" : req.session.username} );

    Post.find({}, (err, all) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            
            res.render('posts/new.ejs', {
                user: currentUser
            })
        }
    });

});

// Post - Show
router.get('/:id', (req, res) => {
    // req.params.id is a post id
    User.findOne({"posts" : req.params.id})
        .populate(
            {
                path: "posts",
                match: {_id: req.params.id}
            })
        .exec((err, foundUser) => {
            console.log(foundUser, " user that made post");

            if(err) {
                console.log(err);
                res.send(err);
            } else {
                res.render('posts/show.ejs', {
                    user: foundUser,
                    post: foundUser.posts[0] // 1st post it finds
                });
            }

        });    
});





module.exports = router;