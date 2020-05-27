const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CompanySchema = new Schema({
    name: {
        type: String
    },
    formerNames: [{
        type: String
    }],
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    type: [{
        type: String,
        enum: ['developer', 'publisher'],
    }],
    founded: {
        type: Date
    },
    keyPeople: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personel'
    }],
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    logo: {
        type: String
    }
});

module.exports = mongoose.model('Company', CompanySchema);