const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const userModel = require('../models/userModel');
const projectModel = require('../models/projectModel');

// Middleware
const authMiddleware = require('../middleware/AuthMiddleware');

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const storageCloud = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    format: async (req, file) => 'png',
    public_id: (req, file) => file.originalname
  },
});

const upload = multer({ storage: storageCloud });

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }
    const projects = await projectModel.find({ user: req.user.id });
    return res.status(200).json({ user, projects });
  } catch (error) {
    return res.status(500).json({ message: 'Errore del server', error: error });
  }
});

router.put('/update', authMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, username } = req.body;
    const avatarUrl = req.file ? req.file.path : null;

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (username) user.username = username;
    if (avatarUrl) user.avatar = avatarUrl;

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

module.exports = router;
