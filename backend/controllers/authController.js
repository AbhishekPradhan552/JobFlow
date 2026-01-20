import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
/**
 * @desc Register new user
 * @route POST/api/auth/register
 * @access Public
 */

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //basic validation
    if (!name || !email || !password) {
      res.status(400).json({ message: "please provide all necessary fields" });
    }
    //check if user already exixts
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    //create user (password hashing happens in model)
    await User.create({
      name,
      email,
      password,
    });
    //send safe response
    res.status(201).json({ message: "User Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //basic validation
    if (!email || !password) {
      res.status(400).json({ message: "Please provide email and password" });
    }

    //find user explicitly include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //match the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //send response
    res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
};
