const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: false
        },
        following: [{
            type: Schema.Types.ObjectId, ref: 'User'
        }]
    },
    { collection : "User" }
)

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;