require("dotenv").config();
const express = require("express");
const QueryDao = require("../data/QueryDao");
const ResultsDao = require("../data/ResultsDao");
const SourceDao = require("../data/SourceDao");
const ApiError = require("../models/ApiError");
const query = new QueryDao();
const source = new SourceDao();
const router = express.Router();


//QUERY TABLE API
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







module.exports = router;