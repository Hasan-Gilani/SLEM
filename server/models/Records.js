const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    books: {
        type: Array,
        required: true
    }
});

module.exports = Records = mongoose.model("records", RecordSchema);
