const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EngineSchema = new Schema({
    name: {
        type: String
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    language: {
        type: String
    },
    notableGames: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    license: {
        type: String
    }
});

module.exports = mongoose.model('Engine', EngineSchema);