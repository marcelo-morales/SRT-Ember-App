require("dotenv").config();
const express = require("express");
const QueryDao = require("../data/QueryDao");
const ResultsDao = require("../data/ResultsDao");
const SourceDao = require("../data/SourceDao");
const ApiError = require("../models/ApiError");
const query = new QueryDao();
const router = express.Router();

//QUERY TABLE API
router.get("/api/queries/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            throw new ApiError(400, "The id needs to be a number");
        }
        const data = await query.read(id);
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
});

router.post("/api/queries", async (req, res, next) => {
    try {
        let { command, email } = req.body;
        if (command === undefined || command === "") {
            throw new ApiError(400, "Require command string");
        }
        if (email === undefined || email === "") {
            throw new ApiError(400, "Require email to submit command");
        }
        let data = await query.create(command, email);
        data["command"] = command;
        data["email"] = email;
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
});
    
router.delete("/api/queries/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await query.delete(id);
        res.status(200).json({ data });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
