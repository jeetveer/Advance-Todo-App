const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    taskname: {
        type: String,
        required: true
    },
    reminder: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Note = new mongoose.model("Note", noteSchema);
module.exports = Note;