const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { validationResult, body } = require("express-validator");
const Note = require("../models/Note");

//ROUTE 1: Get All the Notes using:GET "/api/auth/getuser". Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    console.log(notes);
    res.json(notes);
  } catch (error) {
     //catch error
     console.log(error.message);
     res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Add a new note using: POST "/api/auth/addnote". Login Required
router.post("/addnotes",fetchuser,[
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters.").isLength({ min: 3 })],async (req, res) => 
    {
    try {
      const {title, description, tag} = req.body;
      //If there are errors, return Bad Request and the errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Note({title,description,tag,user:req.user.id});
      console.log('note--',notes);
      const savedNote = await notes.save();
      res.json(savedNote);
      console.log('savednote--',savedNote);
    } catch (error) {
              //catch error
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
