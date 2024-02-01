const express = require("express");
const router = express.Router();
const usersSchema = require("../Model/userSchema");
const authenticate = require("../middleware/authenticate")
const jwt = require("jsonwebtoken");
const Note = require("../Model/notes");

// USER REGISTER 

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    res.status(422).json("plz fill the data");
  }

  if (password !== confirmPassword) {
    res.status(422).json("Passwords do not match");
  }

  ///////////
  try {
    const preuser = await usersSchema.findOne({ email: email });

    if (preuser) {
      res.status(422).json("this is user is already present");
    } else {
      const adduser = new usersSchema({ name, email, password });
      await adduser.save();

      //Token generate
      const token = await adduser.generateAuthToken()
      res.status(201).send(token);

    }
  } catch (error) {
    res.status(422).json(error);
  }
})


// USER LOGIN

router.post("/userlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailCheck = await usersSchema.findOne({ email });
    if (emailCheck && password == emailCheck.password) {

      // token generate
      const token = await emailCheck.generateAuthToken();
      res.status(201).json(token);

    }
    else {
      res.status(422).json("Invalid details password");
      res.status(422).json(`${emailCheck.password}`);
    }

  } catch (error) {
    console.log(error);
    console.log("node me User login me error aayi hai.");
  }

})


// USER Valid form dashboard react

router.get("/dashboard", authenticate, async (req, res) => {
  try {
    const validUserOne = await usersSchema.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, validUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
})


// User Notes 

router.post('/notes', authenticate, async (req, res) => {
  const { taskname, reminder, time, description } = req.body;

  try {

    // Find the current user
    const userId = await usersSchema.findOne({ _id: req.userId });

    // Creating a new note and associate it with the user
    const newNote = new Note({ taskname, reminder, time, description, user: userId });
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get notes for individual user

router.get('/dashboard/notes', authenticate, async (req, res) => {

  try {
    // Find the current user
    const userId = await usersSchema.findOne({ _id: req.userId });

    if (!userId) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all notes associated with the user
    const userNotes = await Note.find({ user: userId });

    res.status(200).json(userNotes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Delete note

router.delete("/delete/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;
    console.log("YE HAI = " + noteId)
    await Note.findByIdAndDelete({ _id: noteId });
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


// Get All Users

router.get('/alluser', async (req, res) => {
  try {
    const users = await usersSchema.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});












module.exports = router;