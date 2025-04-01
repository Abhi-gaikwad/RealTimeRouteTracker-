const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { registerUser } = require("../controllers/userController");
const router = express.Router();



// Route for User Signup
router.post("/signup", registerUser);

// Route for User SignIn
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "User signed in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
