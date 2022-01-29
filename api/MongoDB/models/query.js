const mongoose = require("mongoose");
const QuerySchema = new mongoose.Schema({
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

const Query = mongoose.model("Query", QuerySchema);

module.exports = Query;