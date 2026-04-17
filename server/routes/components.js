import express from "express";
import Component from "../models/Component.js";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/:name", async (req, res) => {
  const comp = await Component.findOne({ name: req.params.name });

  if (!comp) return res.status(404).json("Not found");

  const basePath = path.join("templates", comp.path);

  const files = comp.files.map((file) => {
    const content = fs.readFileSync(
      path.join(basePath, file),
      "utf-8"
    );

    return { name: file, content };
  });

  res.json({ files });
});

export default router;