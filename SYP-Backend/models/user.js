const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        max: 1024
    },
    confirmPassword: {
        type: String
    },
    role: {
        type: String,
        enum : ['user', 'admin'],
        required: true
    }
});

module.exports = mongoose.model('User', User);