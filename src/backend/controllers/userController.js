const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid"); // Import uuid

const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile, emergencyMobile } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique ID
    const uniqueId = uuidv4();

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      emergencyMobile,
      uniqueId, // Assign the generated unique ID
    });

    if (user) {
      res.status(201).json({ message: "User registered successfully", uniqueId: user.uniqueId });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { registerUser };
