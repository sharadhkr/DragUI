import express from "express";
import Component from "../models/components.js";

const router = express.Router();

// 🔥 ADD COMPONENT (ADMIN)
router.post("/add", async (req, res) => {
  const comp = await Component.create(req.body);
  res.json(comp);
});

// 🔥 GET ALL COMPONENTS
router.get("/all", async (req, res) => {
  const comps = await Component.find();
  res.json(comps);
});

export default router;