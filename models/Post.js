const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a new model
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('post', PostSchema)