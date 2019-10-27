const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String },
        photo: { type: String },
        link: { type: String },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment' // reference comment
        }]
    }
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;