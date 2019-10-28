const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Post = require('../models/posts');

// Comment - New (GET)
router.get('posts/:id/newcomment', (req, res) => {
    console.log(req.params.id);
    Post.findById(req.params.id, (err, foundPost) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('comments/new.ejs', {
                post: foundPost,
                postId : req.params.id
            });
        }
    });
});

router.post('/posts/:id', (req, res) => {
    Comment.create(req.body, (err, createdComment) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(req.body)

            // find the user by its username, then push the post
            // into the posts array
            Post.findById(req.body.postId, (err, foundPost) => {
                
                const foundUser = User.findOne({'posts': req.params.id});

                if (err) {
                    console.log(err);
                    res.send(err);
                } else {

                    foundPost.comments.push(createdComment);
                    // if we mutate a document we have to save it

                    foundPost.save((err, savedPost) => {
                        console.log(savedPost)
                        // update the user as well
                        foundUser.save((err, savedUser) => {
                            console.log(savedUser);
                        });

                        res.redirect('/posts/' + req.params.id);
                    });

                    
                    // when we are dealin
                }
            });
        }
    });
});

// // Comment - Put Route
// router.put('/:id', (req, res) => {
//     Post.findByIdAndUpdate(req.params.id, req.body, (err, response) => {
//         if (err) {
//             console.log(err);
//             res.send(err);
//         } else {
//             res.redirect('/posts/' + req.params.id);
//         }

//     });
// });




module.exports = router;