const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Game = new Schema({
    title: {
        type: String
    },
    release: {
        type: Date
    },
    genre: {
        type: String
    },
    developer: {
        type: String
    },
    director: {
        type: String
    },
    publisher: {
        type: String
    },
    coverArt: {
        type: String
    },
    backgroundArt: {
        type: String
    },
    avgRating: {
        type: Number
    }
});

module.exports = mongoose.model('Game', Game);