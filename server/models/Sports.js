const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const SportSchema = new Schema({
    good_id: {
        type: String,
        required: true
    },
    good_type: {
        type: String,
        required: true
    },
    copies: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: false,
        default: true
    }
});

module.exports = Sports = mongoose.model("sports", SportSchema);
