const express = require("express");
const router = express.Router();
const { Exercise } = require("../models");

// Routes

// GET all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET exercise by id
router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params["id"]);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.json(exercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// get exercises by lessonid
router.get("/lesson/:LessonId", async (req, res) => {
  try {
    const exercises = await Exercise.findAll({
      where: {
        LessonId: req.params["LessonId"],
      },
    });
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new exercise
router.post("/", async (req, res) => {
  try {
    const {
      question,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer,
      hint,
      explanation,
      LessonId,
    } = req.body;
    if (
      !question ||
      !answer1 ||
      !answer2 ||
      !answer3 ||
      !answer4 ||
      !correctAnswer ||
      !LessonId
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newExercise = {
      question: question,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      correctAnswer: correctAnswer,
      hint: hint,
      explanation: explanation,
      LessonId: LessonId,
    };
    const exercise = await Exercise.create(newExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update exercise
router.put("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params["id"]);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    await exercise.update(req.body);
    res.json(exercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE exercise
router.delete("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findByPk(req.params["id"]);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    await exercise.destroy();
    res.json({ message: "Exercise deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
