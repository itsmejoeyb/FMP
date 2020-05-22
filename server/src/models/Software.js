const mongoose = require('mongoose')

const { Schema } = mongoose

const softwareSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    features: {
        type: Array,
    },
}, {
    timestamps: true,
})

const Software = mongoose.model('Software', softwareSchema)

module.exports = Software