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

// GET PROJECT by ID
router.get("/get", auth, async (req, res) => {
  const project = await Project.findOne({
    userId: req.userId,
  });

  res.json(project);
});

router.get("/list", auth, async (req, res) => {
  const projects = await Project.find({ userId: req.userId }).sort({
    updatedAt: -1,
  });

  res.json(projects);
});

// GET GENERATED CODE for the current user project
router.get("/code", auth, async (req, res) => {
  const project = await Project.findOne({
    userId: req.userId,
  });

  if (!project) return res.status(404).json("No project");

  const code = generateCode(project.design);

  res.json({ code });
});

router.get("/:id", auth, async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    userId: req.userId,
  });

  if (!project) return res.status(404).json({ error: "No project" });

  const code = generateCode(project.design);

  res.json({
    ...project.toObject(),
    type: "frontend",
    code,
  });
});
export default router;