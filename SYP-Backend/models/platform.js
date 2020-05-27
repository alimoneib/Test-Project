const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlatformSchema = new Schema({
    name: {
        type: String
    },
    picture: {
        type: String
    },
    alternativeNames: [{
        type: String
    }],
    description: {
        type: String
    },
    release: {
        type: Date
    },
    type: {
        type: String,
        enum: ['console', 'computer', 'handheld', 'mobile', 'arcade']
    },
    generation: {
        type: String,
        enum: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth']
    },
    manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    notableGames: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    bestSellingGame: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }
});

module.exports = mongoose.model('Platform', PlatformSchema);