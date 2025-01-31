import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    let token = jwt.sign({ email }, "yash"); // Change the secret key
    console.log(token);
    res.status(201).cookie("token", token, { httpOnly: true }).json({
      message: "User created successfully",
      success: true,
      token
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "").json({
    message: "User logged out successfully",
    success: true,
  });
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const token = jwt.sign({ email }, "yash"); // Change the secret key

    res.status(200).cookie("token", token).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        name: user.name, // Sending name
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
