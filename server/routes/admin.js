import express from "express";
import Component from "../models/components.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// 🔥 Upload Component
router.post(
  "/component",
  upload.array("files"),
  async (req, res) => {
    try {
      const { name, type, category, props } = req.body;

      const files = req.files.map((f) => f.filename);

      const component = await Component.create({
        name,
        type,
        category,
        path: `${type}/${name}`,
        props: props ? props.split(",") : [],
        files,
      });

      res.json(component);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

export default router;