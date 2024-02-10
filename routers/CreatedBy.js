const express = require("express");
const router = express.Router();
const models = require("../models");
const CreatedBy = models.CreatedBy;

// Routes

// GET all courses created by user with userId
router.get("/author/:userId", async (req, res) => {
  try {
    // Get all courseID created by user with userId
    const courseIds = await CreatedBy.findAll({
      where: { userId: req.params["userId"] },
    });
    // Get all courses with courseIds
    const courses = await Promise.all(
      courseIds.map(async (courseId) => {
        return await models.Courses.findByPk(courseId.courseId);
      })
    );
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
