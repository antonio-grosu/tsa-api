const express = require("express");
const router = express.Router();
const models = require("../models");
const OwnedBies = models.OwnedBies;
const Courses = models.Courses;
const Users = models.Users;

// Routes

// GET all ownerships
router.get("/", async (req, res) => {
  try {
    const ownerships = await OwnedBies.findAll();
    if (!ownerships) {
      return res.status(404).json({ error: "Ownerships not found" });
    }
    res.json(ownerships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all courses owned by user with userId
router.get("/user/:userId", async (req, res) => {
  try {
    const courseIds = await OwnedBies.findAll({
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
    const userIds = await OwnedBies.findAll({
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
    const ownership = await OwnedBies.create({
      courseId: courseId,
      userId: userId,
    });
    res.json(ownership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
