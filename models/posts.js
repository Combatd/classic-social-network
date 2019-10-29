const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String },
        photo: { type: String },
        link: { type: String },
        comments: [
            // comments will go here
        ]
    }
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;