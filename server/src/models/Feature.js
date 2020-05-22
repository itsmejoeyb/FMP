const mongoose = require('mongoose')

const { Schema } = mongoose

const featureSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    comments: {
        type: Array,
    },
    votes: {
        type: Array,
    },
}, {
    timestamps: true,
})

const Feature = mongoose.model('Feature', featureSchema)

module.exports = Feature