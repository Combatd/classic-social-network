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
    const currentUser = User.findOne({ _id : req.session.userId} );
    console.log(req.session.id, " id of currentUser");
    console.log(currentUser);
    Post.find({}, (err, allPosts) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            
            res.render('posts/new.ejs', {
                user: currentUser,
                posts: allPosts
            })
        }
    });

});

// Post - Show
router.get('/:id', (req, res) => {
    // req.params.id is a post id
    User.findOne({'posts' : req.params.id})
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

router.get('/:id/edit', (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('posts/edit.ejs' , {
                post: foundPost
            });
        }
    });
});

router.post('/', (req, res) => {
    Post.create(req.body, (err, createdPost) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(req.body)

            // find the user by its username, then push the post
            // into the posts array
            User.findOne( { username: req.session.username }, (err, foundUser) => {

                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    
                    foundUser.posts.push(createdPost);
                    // if we mutate a document we have to save it

                    foundUser.save((err, savedPost) => {
                        console.log(savedPost)
                        res.redirect('/posts')
                    })
                    // when we are dealin
                }
            });
        }
    });
});

// Post - Delete Route 
router.delete('/:id', (req, res) => {
    // when we delete a post, we want to remove that
    // post from the users array

    Post.findByIdAndRemove(req.params.id, (err, response) => {

        User.findOne({ 'posts': req.params.id }, (err, foundUser) => {
            if (err) {
                res.send(err);
            } else {
                // attached to mongo arrays, has a remove that takes
                // an id
                foundUser.posts.remove(req.params.id);
                // if we mutate a document, we need to save it
                // back to the db
                foundUser.save((err, updatedUser) => {
                    console.log(updatedUser, ",--- update user")
                    res.redirect('/posts')
                })
            }
        })

    });
});

// Post - Put Route
router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, (err, response) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect('/posts/' + req.params.id);
        }

    });
});




module.exports = router;