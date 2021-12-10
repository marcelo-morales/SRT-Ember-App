require("dotenv").config();
const express = require("express");
const results = require("../routes/results.js"); 
const { globalErrorHandler } = require("../util/middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("SRT API!");
});

app.use(results);
app.use(globalErrorHandler);

module.exports = app;



