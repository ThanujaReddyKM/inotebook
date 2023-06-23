const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser')

const JWT_SCCRET = "ThanujaSorunAmma";


//Route 1:  Create a user using: POST "/api/auth/createuser".  No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password length should be min 3").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //If there are errors, return Bad Request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check weather the user with this email exits already.
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry user with this email is already exits" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      //console.log('data=>'+data);
      const authtoken = jwt.sign(data, JWT_SCCRET);
      console.log(authtoken)

      res.json({ authtoken });
      //res.json({user})
    } catch (error) {
      //catch error
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 2: Aunthenticate a User Using :POST"/api/auth/login". No Login required.
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password Cannot be Blank").exists(),
  ],
  async (req, res) => {
    //If there are errors, return Bad Request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    console.log("email==>", req.body);
    try {
      let user = await  User.findOne({ email });
      console.log("user=>" + user);
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      console.log("password", +password);
      console.log("user password", user.password);
      console.log("passwordCompare=>" + passwordCompare);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SCCRET);
      res.json(authtoken);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: Get loggedin user Deatails using:POST "/api/auth/getuser". Login Required
router.post('/getuser',fetchuser, async(req,res)=>{
    try {
      const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");      
    }
})


module.exports = router;



// Simply tried.
// router.post('/',
// [
//   body("name", "Enter a Valid Name thanuja").isLength({ min: 3 }),
//   body("email", "Enter a valid email").isEmail(),
//   body("password", "Password length should be min 3").isLength({ min: 3 }),
// ],(req,res)=>{
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   // console.log(req.body);
//    const user = User(req.body);
//    user.save()
//   res.send(req.body);
// })