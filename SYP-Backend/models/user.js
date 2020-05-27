const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean
    },
    password: {
        type: String,
        required: true,
        max: 1024
    },
    birthdate: {
        type: Date
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        required: true
    },
    achievements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    gamesOwned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    gamesCompleted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    gamesPlaying: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    gamesWishlist: [{
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
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    gameLogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Log'
    }],
    gameReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }],
    clonedLists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }],
    favouriteGames: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    avatar: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);