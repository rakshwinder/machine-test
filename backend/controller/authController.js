import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    if (await User.findOne({ email }))
      return res.status(400).json({ success: false, message: "User already exists" });
    const user = await User.create({ name, email, phone, password: hashed });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ success: true, token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
