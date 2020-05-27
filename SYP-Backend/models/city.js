const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CitySchema = new Schema({
    name: {
        type: String
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    }
});

module.exports = mongoose.model('City', CitySchema);