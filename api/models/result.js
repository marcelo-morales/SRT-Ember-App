const mongoose = require("mongoose");
const ResultSchema = new mongoose.Schema({
    command: {
        type: String, 
        default: "",
        required: true
    },
    data: {
        type: String,
        default: "",
        required: false
    },
    image: {
        type: Buffer,
        required: false 
    }
});

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;