import User from "../mongooseModels/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'f9275f38c0b142bfb0d02c6d5ab3d5c7b18e47c172cf8b3447f85dc8fc02cda8';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid Email" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    // ✅ Generate JWT Token here
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // payload data
      JWT_SECRET,                              // secret key
      { expiresIn: '1h' }                      // token expiration time
    );

    // ✅ Send token and some user details (not password!)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || '', // optional
        // Add more fields if you want
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};