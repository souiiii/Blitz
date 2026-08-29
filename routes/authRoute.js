import Router from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { setUser } from "../services/auth.js";
import validator from "validator";

const router = Router();

router.post("/signup", async (req, res) => {
  let { email, password, name } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({ err: "Invalid request" });

  name = name.trim().toLowerCase();
  email = email.trim().toLowerCase();

  if (!validator.isEmail(email))
    return res.status(400).json({ err: "Invalid email format" });

  const user = await User.findOne({ email });

  if (user) return res.status(400).json({ err: "User already exists" });

  const hashedPass = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPass });

  return res.status(201).json({ msg: "Account created" });
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ err: "Invalid request" });

  email = email.trim().toLowerCase();
  if (!validator.isEmail(email))
    return res.status(400).json({ err: "Invalid email format" });

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ err: "Account not found" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ err: "Invalid credentials" });

  try {
    const token = setUser({ id: user._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.production || false,
      sameSite: "none",
    });

    return res.status(200).json({ msg: "logged in" });
  } catch (err) {
    return res.status(500).json({ err: "Problem signing in" });
  }
});

export default router;
