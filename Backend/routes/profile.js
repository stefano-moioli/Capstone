const express = require('express');
const router = express.Router();

const userModel = require('../models/userModel');
const projectModel = require('../models/projectModel');

//Middleware
const authMiddleware = require('../middleware/AuthMiddleware');


router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Autore non trovato' });
        }
        
        const projects = await projectModel.find({ user: req.user.id })
        
        return res.status(200).json({user, projects});
    
    } catch (error) {
        return res.status(500).json({ message: 'Errore del server', error: error });
    }
});

module.exports = router;