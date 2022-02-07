const mongoose = require("mongoose");
const ResultsSchema = new mongoose.Schema({
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
    plot: {
        type: Buffer,
        required: false 
    }
});

const Results = mongoose.model("Results", ResultsSchema);

module.exports = Results;