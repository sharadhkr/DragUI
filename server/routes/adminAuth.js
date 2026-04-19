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

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingAdmin = await Admin.findOne({ adminId });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin ID already exists" });
    }

    const admin = new Admin({
      adminId,
      password,
      email: email || null,
    });

    await admin.save();

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET || "secret-key", {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: {
        _id: admin._id,
        adminId: admin.adminId,
        email: admin.email
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message || "Registration failed" });
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

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET || "secret-key", {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      admin: {
        _id: admin._id,
        adminId: admin.adminId,
        email: admin.email
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message || "Login failed" });
  }
});

// Get Admin Profile (protected)
router.get("/profile", adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: err.message || "Failed to fetch profile" });
  }
});

export default router;
