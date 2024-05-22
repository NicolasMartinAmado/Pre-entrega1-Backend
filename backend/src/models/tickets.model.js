const { Schema, model } = require('mongoose')

const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        ref: `users`,
        default:"user"
    }
})

exports.ticketModel = model('ticket', ticketSchema)