const express = require("express");
const router = express.Router();
const models = require("../models");
const Courses = models.courses;

// Routes

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Courses.findAll();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all courses by author id
router.get("/:authorId", async (req, res) => {
  // find all courses by author id using CreatedBy model
  try {
    const courses = await Courses.findAll({
      include: {
        model: CreatedBy,
        as: "author",
        where: { userId: req.params["authorId"] },
      },
    });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET course by id
router.get("/:id", async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params["id"]);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET course by title
router.get("/:title", async (req, res) => {
  try {
    const course = await Courses.findOne({
      where: { title: req.params["title"] },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new course
router.post("/", async (req, res) => {
  try {
    const course = req.body;
    await Courses.create(course);
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT modify course by id
router.put("/:id", async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params["id"]);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await course.update(req.body);
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT modify course by title
router.put("/:title", async (req, res) => {
  try {
    const course = await Courses.findOne({
      where: { title: req.params["title"] },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await course.update(req.body);
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE course by id
router.delete("/:id", async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params["id"]);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await course.destroy();
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE course by title
router.delete("/:title", async (req, res) => {
  try {
    const course = await Courses.findOne({
      where: { title: req.params["title"] },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await course.destroy();
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
