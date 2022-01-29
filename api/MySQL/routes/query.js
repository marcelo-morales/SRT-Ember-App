require("dotenv").config();
const express = require("express");
const QueryDao = require("../data/QueryDao");
const ApiError = require("../models/ApiError");
const query = new QueryDao();
const router = express.Router();
const queriesTable = process.env.MYSQL_TABLE_QUERIES;
const resultsTable = process.env.MYSQL_TABLE_RESULTS;


//QUERY TABLE API
router.get("/api/queries", async (req, res, next) => {
    try{
        const data = await query.readAll(queriesTable);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.get("/api/queries/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            throw new ApiError(400, "The id needs to be a number");
        }
        const data = await query.read(id, queriesTable);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.post("/api/queries", async (req, res, next) => {
    try {
        let model = undefined;
        let { command, email } = req.body
        if (command === undefined) {
            model = req.body;
            command = model.data.attributes.command;
            email = model.data.attributes.email;
        }
        if (command === undefined || command === "" ) {
            throw new ApiError(400, "Require command string");
        }
        if (email === undefined || email === "") {
            throw new ApiError(400, "Require email to submit command");
        }

        
        const data = await query.create(command, email, queriesTable);
        if (model !== undefined) {
            model.data.attributes.dbid = "2";
            model.data.id = data._id;
            res.status(200).json(model);
        } else {
            res.status(200).json({data});
        }
    } catch (err) {
        next(err);
    }
});

router.delete("/api/queries/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await query.delete(id, queriesTable);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

// RESULTS TABLE API
router.get("/api/results", async (req, res, next) => {
    try{
        const data = await query.readAll(resultsTable);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.get("/api/results/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            throw new ApiError(400, "The id needs to be a number");
        }
        const data = await query.read(id, resultsTable);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.post("/api/results", async (req, res, next) => {
    try {
        let model = undefined;
        let { command } = req.body
        if (command === undefined) {
            model = req.body;
            command = model.data.attributes.command;
        }
        if (command === undefined || command === "") {
            throw new ApiError(400, "Require command string");
        }
        
        const data = await query.create(command, resultsTable);
        if (model !== undefined) {
            model.data.attributes.dbid = "2";
            model.data.id = data._id;
            res.status(200).json(model);
        } else {
            res.status(200).json({data});
        }
    } catch (err) {
        next(err);
    }
});

router.put("/api/results/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let { data, image } = req.body;

        if (data === undefined && image === undefined) {
            throw new ApiError(400, "Require values inorder to update");
        }
        data = await query.update(id, { data, image}, resultsTable);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.delete("/api/results/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await query.delete(id, resultsTable);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

module.exports = router;