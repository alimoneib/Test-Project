const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let User = new Schema({
    email: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    },
    role: {
        type: String,
        enum : ['user', 'admin'],
        required: true
    }
});

User.pre('save', function(next){
    if(!this.isModified('password')){
        return next();
    }
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if(err){
            return next(err)
        } else {
            this.password = hashedPassword;
            next();
        }
    });
});

User.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err,isMatch)=>{
        if(err){
            return cb(err);
        } else {
            if(!isMatch){
                return cb(null, isMatch);
            } else {
                return cb(null, this);
            }
        }
    })
}

module.exports = mongoose.model('User', User);