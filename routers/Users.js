const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const models = require("../models");
const Users = models.users;

// Routes

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params["id"]);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET user by username
router.get("/:username", async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { userName: req.params["username"] },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new user
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    bcrypt.hash(password, 10).then(async (hash) => {
      const newUser = await Users.create({
        userName: userName,
        password: hash,
        email: email,
        firstName: firstName,
        lastName: lastName,
        level: 0,
        icon: "",
        dateOfCreation: new Date(),
        dateOfLastLogin: new Date(),
      });
      res.json(newUser);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login post method
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Wrong username and password combination" });
    }

    res.json({
      authenticated: true,
      message: "Logged in successfully",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT modify user by id
router.put("/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params["id"]);
    const newUser = req.body;
    await user.update(newUser);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE user by id
router.delete("/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params["id"]);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
