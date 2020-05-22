const mongoose = require('mongoose')

const { Schema } = mongoose

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    description: {
        type: String,
    },
    software: {
        type: Array,
    },
}, {
    timestamps: true,
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company