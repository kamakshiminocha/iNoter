const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String,
        default: 'Title'
    },
    content: {
        type: String
    },
    tag:{
        type: [String]
    }

})

module.exports = mongoose.model('Note',NoteSchema)