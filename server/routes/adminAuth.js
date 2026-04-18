import express from "express";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// Register Admin
router.post("/register", async (req, res) => {
  try {
    const { adminId, password, email } = req.body;

    if (!adminId || !password) {
      return res.status(400).json({ message: "Admin ID and password required" });
    }

    const existingAdmin = await Admin.findOne({ adminId });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin ID already exists" });
    }

    const admin = await Admin.create({
      adminId,
      password,
      email,
    });

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: { adminId: admin.adminId, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login Admin
router.post("/login", async (req, res) => {
  try {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
      return res.status(400).json({ message: "Admin ID and password required" });
    }

    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(401).json({ message: "Invalid admin ID or password" });
    }

    const isPasswordCorrect = await admin.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid admin ID or password" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      admin: { adminId: admin.adminId, email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Admin Profile (protected)
router.get("/profile", adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
