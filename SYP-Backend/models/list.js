const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ListSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    listOfGames: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    clonedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('List', ListSchema);