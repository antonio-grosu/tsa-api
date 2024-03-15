const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const models = require("../models");
const Users = models.Users;

// Routes

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll();
    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }
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
    const user = await Users.findAll({
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

// POST new user and crypt password with bcrypt before saving
router.post("/", async (req, res) => {
  try {
    const { email, password, userName, firstName, lastName } = req.body;
    if (!email || !password || !userName || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    bcrypt.hash(String(password), 10).then((hashedPassword) => {
      const newUser = {
        email: email,
        password: hashedPassword,
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        xp: 0,
        icon: "",
        dateOfCreation: new Date(),
        dateOfLastLogin: new Date(),
      };
      Users.create(newUser);
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
    res.status(500).json({ error: "Server is down. I repeat. Server is down" });
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
