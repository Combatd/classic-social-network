const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String , required: true},
        email: { type: String, required: true },
        password: { type: String, required: true },
        date: { type: Date , default: Date.now },
        photo: { type: String },
        posts: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post' // references post
        }],
        favorites: [ 
                // favorite posts unshift here
        ]
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User; 