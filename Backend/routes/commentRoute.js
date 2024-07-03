const express = require('express');
const router = express.Router();
const commentModel = require('../models/commentModel');
const authMiddleware = require ('../middleware/AuthMiddleware');

//Rotta per aggiungere commento
router.post('/comments', authMiddleware, async(req, res) =>{
    try {
        const {projectId, text} = req.body;
        const newComment = new commentModel({
            project: projectId,
            user: req.user.id,
            text
        });
        await newComment.save();
        return res.status(200).json(newComment);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

//Recupero commenti per un progetto
router.get('/comments/:projectId', async(req, res)=>{
    try {
        const comments = await commentModel.find({project: req.params.projectId}).populate('user', 'username');
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;