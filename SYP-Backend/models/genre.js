const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GenreSchema = new Schema({
    name: {
        type: String
    },
    alternativeNames: [{
        type: String
    }],
    description: {
        type: String
    },
    notableGames: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }]
});

module.exports = mongoose.model('Genre', GenreSchema);