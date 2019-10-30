const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    body: { type: String, required: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;