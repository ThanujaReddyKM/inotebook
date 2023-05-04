const express = require('express');
const User = require('../models/Users')
const router = express.Router();

//Create a user using: POST "/api/auth". Doesn't requite Auth
router.get('/',(req,res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);

})

module.exports = router