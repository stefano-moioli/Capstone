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

router.patch('/project/:id/publish', authMiddleware, async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        project.published = !project.published;
        await project.save();

        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error });
    }
});

router.get('/user/:userId/projects', authMiddleware, async (req, res) => {
    try {
        const projects = await projectModel.find({ user: req.params.userId, published: true }).populate('user', 'username email');
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error });
    }
});



module.exports = router;
