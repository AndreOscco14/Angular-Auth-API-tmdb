const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nameuser: String,
    lastname: String,
    email: String,
    password: String,
    birth: Date
}, {
    timestamps: true
})

module.exports = model('User', userSchema)