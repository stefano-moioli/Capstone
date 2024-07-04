const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/users', async (req, res) => {
    try {
        const users = await userModel.find({}, 'username');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error });
    }
});

router.post('/follow/:userId', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        const userToFollow = await userModel.findById(req.params.userId);

        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.following.includes(req.params.userId)) {
            return res.status(400).json({ message: 'Already following this user' });
        }

        user.following.push(req.params.userId);
        await user.save();

        return res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error });
    }
});

router.post('/unfollow/:userId', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        const userToUnfollow = await userModel.findById(req.params.userId);

        if (!userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.following.includes(req.params.userId)) {
            return res.status(400).json({ message: 'Not following this user' });
        }

        user.following = user.following.filter(followingId => followingId.toString() !== req.params.userId);
        await user.save();

        return res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error });
    }
});

router.get('/following', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).populate('following', 'username');
        return res.status(200).json(user.following);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error });
    }
});

module.exports = router;