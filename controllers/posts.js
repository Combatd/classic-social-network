const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const Comment = require('../models/comments');

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






module.exports = router;