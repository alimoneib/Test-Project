const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user')
const JwtStrategy = require('passport-jwt').Strategy;


const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies){
        token = req.cookies["access_token"]
    }
    return token;
}

// authorization
passport.use(new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey : "032A70875D1C78BA51732B98CE4E44C6BA4CDE59D097A0401A96AE1AE58F7634"
    },(payload,done)=>{
        User.findById({_id : payload.sub}, (err,user)=>{
            if(err){
                return done(err, false);
            } else if (!user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
}))

// authentication local strategy using username and password
passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({username},(err, user)=>{
        if(err){            // something went wrong with database
            return done(err);
        } else if (!user){          // if no user exist
            console.log("User does not exist")
            return done(null, false);
        } else {            // check if password is correct
            user.comparePassword(password, done);
        }
    })
}))