const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { validationResult, body } = require("express-validator");
const Note = require("../models/Note");

//ROUTE 1: Get All the Notes using:GET "/api/notes/getuser". Login Required
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

//ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login Required
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




//ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". Login Required
router.put("/updatenotes/:id",fetchuser,async(req, res) => 
    {
        const {title, description,tag}=req.body;
        //Create a newNote Object
        const newNote = {};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    })

//ROUTE 4: delete an existing note using: DELETE "/api/notes/deletenote". Login Required
router.delete("/deletenote/:id",fetchuser,async(req,res)=>{
  try {
      //Find the note to be delete and delete it
  let note = await Note.findById(req.params.id);
  console.log('note=>',note)
  if(!note){
    return res.status(404).send("Not found Record")
  }

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndDelete(req.params.id);
  res.json({"Success" :"Note has been deleted",note:note})
  } catch (error) {
    //catch error
console.log(error.message);
res.status(500).send("Internal Server Error");
}

})



module.exports = router;
