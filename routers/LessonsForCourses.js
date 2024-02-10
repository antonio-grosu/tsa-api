const express = require('express');
const router = express.Router();
const { LessonsForCourses } = require('../models');
const Lessons = require('../models/Lessons');

// Routes

// GET all lessons for a course
router.get('/:courseId', async (req, res) => {
    try {
        const lessonIds = await LessonsForCourses.findAll({ where: { courseId: req.params['courseId'] } });
        if (!lessonIds) {
            return res.status(404).json({ error: 'No lessons for this course' });
        }
        const lessons = await Lessons.findAll({ where: { id: lessonIds.map(lessonId => lessonId.lessonId) } });
        res.json(lessons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST new lesson for a course
router.post('/:courseId/:lessonId', async (req, res) => {
    try {
        const lessonForCourse = {
            courseId: req.params['courseId'],
            lessonId: req.params['lessonId']
        };
        await LessonsForCourses.create(lessonForCourse);
        res.json(lessonForCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;