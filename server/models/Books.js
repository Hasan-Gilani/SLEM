const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const BookSchema = new Schema({
    isbn: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subject: {
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

module.exports = Books = mongoose.model("books", BookSchema);
