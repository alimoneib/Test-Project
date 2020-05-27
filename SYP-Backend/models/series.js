const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SeriesSchema = new Schema({
    title: {
        type: String
    },
    alternativeTitles: [{
        type: String
    }],
    description: {
        type: String
    },
    developer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    creator: [{
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
    platforms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Platform'
    }],
    screenshots: [{
        type: String
    }],
    logo: {
        type: String
    }
});

module.exports = mongoose.model('Series', SeriesSchema);