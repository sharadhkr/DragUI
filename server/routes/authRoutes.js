import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();
import passport from "../config/Passport.js";



// ================= EMAIL LOGIN =================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    // 🔥 AUTO REGISTER
    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ email, password: hashed });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json("Invalid password");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});


// ================= GOOGLE =================
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET
    );

    res.redirect(`http://localhost:5173/auth-success?token=${token}`);
  }
);


// ================= GITHUB =================
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET
    );

    res.redirect(`http://localhost:5173/auth-success?token=${token}`);
  }
);


router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
  });

  res.json({ message: "User created" });
});
router.post("/cli-login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return res.status(404).json("User not found");

  // 🟢 PUBLIC ACCOUNT
  if (!user.isPrivate) {
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET
    );

    return res.json({ token });
  }

  // 🔴 PRIVATE ACCOUNT
  if (!password) {
    return res.status(400).json("Password required");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json("Invalid password");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET
  );

  res.json({ token });
});

export default router;