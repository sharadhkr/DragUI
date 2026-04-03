import express from "express";
import Project from "../models/Project.js";
import auth from "../middleware/auth.middleware.js";

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

// GET PROJECT
router.get("/get", auth, async (req, res) => {
  const project = await Project.findOne({
    userId: req.userId,
  });

  res.json(project);
});

export default router;