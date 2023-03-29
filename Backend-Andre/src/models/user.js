const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    birth: Date
})

module.exports = model('User', userSchema)