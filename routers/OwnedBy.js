const express = require("express");
const router = express.Router();
const models = require("../models");
const OwnedBy = models.OwnedBy;

// Routes

// GET all courses owned by user with userId
router.get("/user/:userId", async (req, res) => {
  try {
    const courseIds = await OwnedBy.findAll({
      where: { userId: req.params["userId"] },
    });
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
