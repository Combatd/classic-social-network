const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String },
        photo: { type: String },
        link: { type: String }
    }
)

const Post = mongoose.model('posts', postSchema);

module.exports = Post;