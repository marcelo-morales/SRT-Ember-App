const express = require("express");
const QueryDao = require("../data/QueryDao");
const SourceDao = require("../data/SourceDao");
const ResultsDao = require("../data/ResultsDao")
const ApiError = require("../models/ApiError");
const query = new QueryDao();
const source = new SourceDao();
const results = new ResultsDao();
const router = express.Router();


router.get("/api/queries", async (req, res, next) => {
    try{
        const data = await query.readAll();
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.get("/api/queries/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await query.read(id);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

//ember posting 
//TODO check if commands are already in database
router.post("/api/queries", async (req, res, next) => {
    try {
        let model = undefined;
        let { command } = req.body
        if (command === undefined) {
            model = req.body;
            command = model.data.attributes.command;
        }
        if (command === undefined) {
            throw new ApiError(400, "Require command string");
        }
        const data = await query.create(command);
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

router.put("/api/queries/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let { data, image } = req.body;

        if (data === undefined && image === undefined) {
            throw new ApiError(400, "Require values inorder to update");
        }
        data = await query.update(id, { data, image} );
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.delete("/api/queries/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await query.delete(id);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.get("/api/sources", async (req, res, next) => {
    try{
        const data = await source.readAll();
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

// Get results from DB based on a command
router.get("/api/results", async (req, res, next) => {
    try{
        const { command } = req.body
        const data = await results.read(command);
        
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

module.exports = router;