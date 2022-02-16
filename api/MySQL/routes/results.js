require('dotenv').config();
const express = require('express');
const ApiError = require('../models/ApiError');
const ResultsDao = require('../data/ResultsDao');
const results = new ResultsDao();
const router = express.Router();

//Reads either entire results or results filtered by command
router.get('/api/results', async (req, res, next) => {
    try {
        const { command } = req.body;
        if (command === undefined || command === '') {
            const data = await results.readAll();
            res.status(200).json({ data });
        } else {
            const data = await results.read(command);
            res.status(200).json({ data });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/api/results', async (req, res, next) => {
    try {
        let model = undefined;
        let { command } = req.body;
        if (command === undefined || command === '') {
            throw new ApiError(400, 'Require command string');
        }

        const data = await results.create(command);
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
});

router.put('/api/results/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let { data, image } = req.body;

        if (data === undefined && image === undefined) {
            throw new ApiError(400, 'Require values inorder to update');
        }
        data = await results.update(id, { data, image });
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
});

router.delete('/api/results/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await results.delete(id);
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
