const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GameSchema = new Schema({
    title: {
        type: String
    },
    alternativeTitles: [{
        type: String
    }],
    coverArt: {
        type: String
    },
    screenshots: [{
        type: String
    }],
    description: {
        type: String
    },
    release: {
        type: Date
    },
    avgRating: {
        type: Number
    },
    series: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Series',
        default: null
    },
    developer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    designer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personel'
    }],
    publisher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    genre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    favouritedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    platforms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    gameEngine: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Engine'
    }],
    reccommendations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    ageRatings: [{
        type: String
    }],
    listEntries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }]

});

module.exports = mongoose.model('Game', GameSchema);