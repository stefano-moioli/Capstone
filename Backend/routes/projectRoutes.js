const express = require('express');
const router = express.Router();
const projectModel = require('../models/projectModel');

const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/projects', authMiddleware, async(req, res) =>{
    try {
        const { title, category, text } = req.body;

        const newProject = new projectModel({
            title, 
            category,
            text,
            user: req.user.id
        });

        await newProject.save();
        return res.status(200).json(newProject);
    } catch (error) {

        return res.status(500).json({message: "Errore del server", error: error});
    }
});

router.get('/projects/:id', authMiddleware, async(req, res) =>{
    try {
        const project = await projectModel.findById(req.params.id).populate('user', 'username email');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error });
    }
});

module.exports = router;
