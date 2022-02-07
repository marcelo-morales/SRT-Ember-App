const mongoose = require("mongoose");
const SourceSchema = new mongoose.Schema({
    source: {
        type: String, 
        default: "",
        required: true
    }
});

const Source = mongoose.model("Source", SourceSchema);

module.exports = Source;