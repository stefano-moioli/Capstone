const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();
require('dotenv').config();



//Homepage route
router.get('/', (req, res) =>{
    return res.status(200).json({message: 'Welcome to the homepage'})
})

//User by ID
/*router.get('/user/:id', async(req, res)=>{
    const id = req.params.id;
    try{
        const user = await userModel.findById(id);
    }
})*/


module.exports = router;