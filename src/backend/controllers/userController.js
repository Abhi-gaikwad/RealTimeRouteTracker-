const User = require('../models/User');

// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const user = new User({ name, email, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const user = await User.create({ name, email, password });
      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      res.status(200).json({ message: 'User logged in successfully' });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };