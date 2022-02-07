const mongoose = require("mongoose");
const QuerySchema = new mongoose.Schema({
    command: {
        type: String, 
        default: "",
        required: true
    },
    email: {
        type: String,
        default: "",
        required: true
    }
});

const Query = mongoose.model("Query", QuerySchema);

module.exports = Query;