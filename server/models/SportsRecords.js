const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SportRecordSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    goods: {
        type: Array,
        required: true
    }
});

module.exports = SpRecords = mongoose.model("sprecords", SportRecordSchema);
