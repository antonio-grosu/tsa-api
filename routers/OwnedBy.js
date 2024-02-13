const express = require("express");
const router = express.Router();
const { OwnedBy, Courses, Users } = require("../models");

// Routes

// GET all courses owned by user with userId
router.get("/user/:userId", async (req, res) => {
  try {
    const courseIds = await OwnedBy.findAll({
      where: { userId: req.params["userId"] },
    });
    const courses = await Promise.all(
      courseIds.map(async (courseId) => {
        return await Courses.findByPk(courseId.courseId);
      })
    );
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all users who own course with courseId
router.get("/course/:courseId", async (req, res) => {
  try {
    const userIds = await OwnedBy.findAll({
      where: { courseId: req.params["courseId"] },
    });
    const users = await Promise.all(
      userIds.map(async (userId) => {
        return await Users.findByPk(userId.userId);
      })
    );
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new ownership
router.post("/", async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const ownership = await OwnedBy.create({
      userId: userId,
      courseId: courseId,
    });
    res.json(ownership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
