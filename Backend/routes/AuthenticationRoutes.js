const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const userModel = require('../models/userModel');

router.post('/auth/register', (req, res) =>{

    const password = req.body.password;

    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, async function(err, hash) {

        const user = new userModel({
            ...req.body,
            password: hash,
            verified: false
        });
        await user.save();
        return res.status(201).json('User Created with Success');
    });
});
})

router.post('/auth/login', async (req, res) => {
    const email = req.body.email;
    const userLogin = await userModel.findOne({ email: email });
    if (userLogin) {
      const log = await bcrypt.compare(req.body.password, userLogin.password);
      if (log) {
        const token = jwt.sign(
          {
            id: userLogin.id,
            email: userLogin.email,
            name: userLogin.name,
            username: userLogin.username,
            avatar: userLogin.avatar
          }, 
          jwtSecretKey, 
          { expiresIn: "1h" }
        );
  
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ message: "Invalid Email" });
    }
  });

module.exports = router;