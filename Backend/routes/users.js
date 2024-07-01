const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.get('/users', async (req, res) => {
    try {
        const users = await userModel.find({}, 'username');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error });
    }
});

module.exports = router;
