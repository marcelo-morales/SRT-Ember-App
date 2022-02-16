require('dotenv').config();
const express = require('express');
const ApiError = require('../models/ApiError');
const SourceDao = require('../data/SourceDao');
const source = new SourceDao();
const router = express.Router();

router.get('/api/sourcelists', async (req, res, next) => {
  try {
    const data = await source.readAll();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
