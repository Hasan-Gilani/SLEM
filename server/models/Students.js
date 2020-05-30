const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const StudentSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    surcharge: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = Students = mongoose.model("students", StudentSchema);
