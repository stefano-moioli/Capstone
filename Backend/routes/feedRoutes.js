const express = require('express');
const router = express.Router();
const projectModel = require('../models/projectModel');
const userModel = require('../models/userModel');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/feed', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).populate('following');
        const followingIds = user.following.map(following => following._id);

        const feed = await projectModel.find({ user: { $in: followingIds }, published: true }).populate('user', 'username');
        return res.status(200).json(feed);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error });
    }
});

module.exports = router;
