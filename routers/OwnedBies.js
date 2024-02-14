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
    if (!req.body.UserId) {
      return res.status(400).json({ error: "UserId is required" });
    }
    if (!req.body.courseId) {
      return res.status(400).json({ error: "courseId is required" });
    }
    const ownership = await OwnedBies.create({
      courseId: req.body.courseId,
      UserId: req.body.UserId,
    });
    res.json(ownership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE ownership
router.delete("/", async (req, res) => {
  try {
    if (!req.query.UserId) {
      return res.status(400).json({ error: "UserId is required" });
    }
    if (!req.query.courseId) {
      return res.status(400).json({ error: "courseId is required" });
    }
    const ownership = await OwnedBies.destroy({
      where: {
        courseId: req.body.courseId,
        UserId: req.body.UserId,
      },
    });
    if (ownership === 0) {
      return res.status(404).json({ error: "Ownership not found" });
    }
    res.json({ message: "Ownership deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
