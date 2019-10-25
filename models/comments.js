const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;