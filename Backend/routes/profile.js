const express = require('express');
const router = express.Router();

const userModel = require('../models/userModel');

//Middleware
const authMiddleware = require('../middleware/AuthMiddleware');


router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Autore non trovato' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Errore del server', error: error });
    }
});

module.exports = router;