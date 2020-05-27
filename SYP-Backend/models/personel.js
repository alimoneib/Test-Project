const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let personelSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    bio: {
        type: String
    },
    birthdate: {
        type: Date
    },
    role: {
        type: String,
        enum: ['designer', 'developer', 'youtuber', 'streamer', 'composer', 'voiceActor'],
    },
    notableWork: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    picture: {
        type: String
    }
});

module.exports = mongoose.model('Personel', personelSchema);