const express = require('express');
const router = express.Router();
const { ExerciseForLesson } = require('../models');

// Routes

// GET all exercises for a lesson with lesson id
router.get('/lesson/:id', async (req, res) => {
    try {
        const exercises = await ExerciseForLesson.findAll({ where: { lessonId: req.params['id'] } });
        res.json(exercises);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST new exercise for a lesson with lesson id
router.post('/lesson/:id', async (req, res) => {
    try {
        const exercise = req.body;
        await ExerciseForLesson.create(exercise);
        res.json(exercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE exercise for a lesson with lesson id
router.delete('/lesson/:id', async (req, res) => {
    try {
        const exercise = await ExerciseForLesson.findByPk(req.params['id']);
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        await exercise.destroy();
        res.json(exercise);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
