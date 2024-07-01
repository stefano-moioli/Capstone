const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },

    comments: [{
        text: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    }]
},
{ collection: "Project" }
)

const projectModel = mongoose.model("Project", projectSchema);
module.exports = projectModel;