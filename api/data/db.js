require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set('debug', true);
const URI = process.env.DB_URI;

async function connect() {
    try { 
        await mongoose.connect(URI);
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connect }