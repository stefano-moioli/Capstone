const mongoose = require('mongoose');
const commentSchema = require('./commentModel');
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
      ref: "User",
      required: true
    },
    comments: [commentSchema],
    published: {
      type: Boolean,
      default: false
    }
  },
  { collection: "Project" }
);

const projectModel = mongoose.model("Project", projectSchema);
module.exports = projectModel;