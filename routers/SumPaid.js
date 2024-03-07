const express = require("express");
const router = express.Router();
const models = require("../models");
const SumPaid = models.SumPaid;

// Routes

// GET all sumPaid
router.get("/", async (req, res) => {
  try {
    const sumPaid = await SumPaid.findAll();
    res.json(sumPaid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all sumPaid by user id
router.get("/user/:userId", async (req, res) => {
  try {
    const sumPaid = await SumPaid.findAll({
      where: { userId: req.params["userId"] },
    });
    res.json(sumPaid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET all sumPaid by date
router.get("/date/:date", async (req, res) => {
  try {
    const sumPaid = await SumPaid.findAll({
      where: { date: req.params["date"] },
    });
    res.json(sumPaid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET sumPaid by id
router.get("/:id", async (req, res) => {
  try {
    const sumPaid = await SumPaid.findByPk(req.params["id"]);
    if (!sumPaid) {
      return res.status(404).json({ error: "SumPaid not found" });
    }
    res.json(sumPaid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST sumPaid
router.post("/", async (req, res) => {
  try {
    const sumPaid = await SumPaid.create(req.body);
    res.json(sumPaid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT sumPaid by id
router.put("/:id", async (req, res) => {
  try {
    const sumPaid = await SumPaid.findByPk(req.params["id"]);
    if (!sumPaid) {
      return res.status(404).json({ error: "SumPaid not found" });
    }
    await sumPaid.update(req.body);
    res.json(sumPaid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE sumPaid by id
router.delete("/:id", async (req, res) => {
  try {
    const sumPaid = await SumPaid.findByPk(req.params["id"]);
    if (!sumPaid) {
      return res.status(404).json({ error: "SumPaid not found" });
    }
    await sumPaid.destroy();
    res.json(sumPaid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
