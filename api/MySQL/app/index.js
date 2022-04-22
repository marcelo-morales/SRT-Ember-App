require("dotenv").config();
const express = require("express");
const cors = require("cors");
const query = require("../routes/query.js"); 
const result = require("../routes/results.js"); 
const source = require("../routes/source.js"); 
const user = require("../routes/user");
const authenticate = require("../routes/authenticate");
 
const { globalErrorHandler } = require("../util/middleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json({ type: 'application/vnd.api+json'}));
app.get("/", (req, res) => {
    res.send("SRT API!");
});

app.use(query);
app.use(result);
app.use(source);
app.use(user);
app.use(authenticate);
app.use(globalErrorHandler);
module.exports = app;



