const express = require('express');
const router = express.Router();
const { Exercise } = require('../models');

// Routes

// GET all exercises
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.findAll();
        res.json(exercises);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET exercise by id
router.get('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findByPk(req.params['id']);
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        res.json(exercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST new exercise
router.post('/', async (req, res) => {
    try {
        const exercise = req.body;
        await Exercise.create(exercise);
        res.json(exercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT update exercise
router.put('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findByPk(req.params['id']);
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        await exercise.update(req.body);
        res.json(exercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE exercise
router.delete('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findByPk(req.params['id']);
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        await exercise.destroy();
        res.json({ message: 'Exercise deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
