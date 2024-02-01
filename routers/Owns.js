const express = require("express");
const router = express.Router();
const { Owns } = require("../models");

// Routes

// GET all relations between users and courses
router.get("/", async (req, res) => {
  try {
    const owns = await Owns.findAll();
    res.json(owns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET a certain relation between a user and a course
router.get("/:userId/:courseId", async (req, res) => {
  try {
    const own = await Owns.findOne({
      where: { userId: req.params["userId"], courseId: req.params["courseId"] },
    });
    if (!own) {
      return res.status(404).json({ error: "Relation not found" });
    }
    res.json(own);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new relation between a user and a course
router.post("/", async (req, res) => {
  try {
    const own = req.body;
    await Owns.create(own);
    res.json(own);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a relation between a user and a course
router.delete("/:userId:courseId", async (req, res) => {
  try {
    const own = await Owns.findOne({
      where: { userId: req.params["userId"], courseId: req.params["courseId"] },
    });
    if (!own) {
      return res.status(404).json({ error: "Relation not found" });
    }
    await own.destroy();
    res.json(own);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
