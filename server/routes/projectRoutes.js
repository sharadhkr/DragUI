import express from "express";
import Project from "../models/Project.js";
import auth from "../middleware/auth.middleware.js";
import { generateCode } from "../utils/generateCode.js";
const router = express.Router();

// SAVE DESIGN
router.post("/save", auth, async (req, res) => {
  const { design, name } = req.body;

  let project = await Project.findOne({
    userId: req.userId,
    name,
  });

  if (project) {
    project.design = design;
    project.updatedAt = Date.now();
    await project.save();
  } else {
    project = await Project.create({
      userId: req.userId,
      name,
      design,
    });
  }

  res.json(project);
});

// GET CURRENT USER'S PROJECT
router.get("/get", auth, async (req, res) => {
  const project = await Project.findOne({
    userId: req.userId,
  });

  res.json(project);
});

// GET GENERATED CODE
router.get("/code", auth, async (req, res) => {
  const project = await Project.findOne({
    userId: req.userId,
  });

  if (!project) return res.status(404).json("No project");

  const code = generateCode(project.design);

  res.json({ code });
});

// GET PROJECT BY ID OR NAME
router.get("/:idOrName", auth, async (req, res) => {
  const { idOrName } = req.params;
  let project;

  // Try to find by MongoDB ObjectId first
  if (idOrName.match(/^[0-9a-fA-F]{24}$/)) {
    project = await Project.findOne({
      _id: idOrName,
      userId: req.userId,
    });
  }

  // If not found by ID, try by name
  if (!project) {
    project = await Project.findOne({
      name: idOrName,
      userId: req.userId,
    });
  }

  if (!project) return res.status(404).json({ error: "Project not found" });

  res.json(project);
});

export default router;