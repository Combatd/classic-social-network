const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String , required: true},
        email: { type: String, required: true },
        password: { type: String, required: true },
        date: { type: Date , default: Date.now },
        photo: { type: String },
        posts: { type: Array },
        favorites: { type: Array }
    }
);

const User = mongoose.model('users', userSchema);

module.exports = User; 