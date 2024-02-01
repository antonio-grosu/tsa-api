const express = require('express');
const router = express.Router();
const { Parts } = require('../models');

// Routes

// GET all parts
router.get('/', async (req, res) => {
    try {
        const parts = await Parts.findAll();
        res.json(parts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET all parts by lessonId
router.get('/lesson/:lessonId', async (req, res) => {
    try {
        const parts = await Parts.findAll({
            where: {
                lessonId: req.params['lessonId']
            }
        });
        res.json(parts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET part by id
router.get('/:id', async (req, res) => {
    try {
        const part = await Parts.findByPk(req.params['id']);
        if (!part) {
            return res.status(404).json({ error: 'Part not found' });
        }
        res.json(part);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST new part
router.post('/', async (req, res) => {
    try {
        const part = req.body;
        await Parts.create(part);
        res.json(part);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT modify part by id
router.put('/:id', async (req, res) => {
    try {
        const part = await Parts.findByPk(req.params['id']);
        if (!part) {
            return res.status(404).json({ error: 'Part not found' });
        }
        await part.update(req.body);
        res.json(part);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE part by id
router.delete('/:id', async (req, res) => {
    try {
        const part = await Parts.findByPk(req.params['id']);
        if (!part) {
            return res.status(404).json({ error: 'Part not found' });
        }
        await part.destroy();
        res.json(part);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
