const express = require("express");
const router = express.Router();
const { Lessons } = require("../models");

// Routes

// GET all lessons
router.get("/", async (req, res) => {
  try {
    const lessons = await Lessons.findAll();
    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all Parts by lessonId
router.get("/lesson/:lessonId", async (req, res) => {
  try {
    const lessons = await Lessons.findAll({
      where: {
        lessonId: req.params["lessonId"],
      },
    });
    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET lesson by id
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lessons.findByPk(req.params["id"]);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new lesson for a course by id
router.post("/", async (req, res) => {
  try {
    const lesson = req.body;
    lesson.courseId = req.params["id"];
    await Lessons.create(lesson);
    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT modify lesson by id
router.put("/:id", async (req, res) => {
  try {
    const lesson = await Lessons.findByPk(req.params["id"]);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    await lesson.update(req.body);
    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE lesson by id
router.delete("/:id", async (req, res) => {
  try {
    const lesson = await Lessons.findByPk(req.params["id"]);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    await lesson.destroy();
    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
