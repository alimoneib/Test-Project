const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CountrySchema = new Schema({
    name: {
        type: String
    },
    flag: {
        type: String
    }
});

module.exports = mongoose.model('Country', CountrySchema);