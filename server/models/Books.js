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
    author: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        date_added: Date.now(),
        required: true
    }
});

module.exports = User = mongoose.model("books", BookSchema);
