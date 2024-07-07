const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const commentModel = mongoose.model('Comment', commentSchema);
module.exports = commentModel;
