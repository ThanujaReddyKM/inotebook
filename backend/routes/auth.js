const express = require('express');
const User = require('../models/Users')
const router = express.Router();
const { validationResult, body } = require('express-validator');

//Create a user using: POST "/api/auth/createuser".  No login required
router.post('/createuser',[
    body('name','Enter a Valid Name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password length should be min 3').isLength({min:3}),
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    User.create({
        name :req.body.name,
        password:req.body.password,
        email:req.body.email,
    }).then(user => res.json(user))
    .catch(err=> {console.log(err) 
         res.json({error:'Please enter a unique value for email',message:err.message})})


    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
     //res.send(req.body);

})

module.exports = router