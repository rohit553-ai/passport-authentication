const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

function initialize(passport, getUserByEmail){
    const authenticateUser =async (email, password, done)=>{
        const user = getUserByEmail(email);
        if(user==null){
            return done(null, false, {message:"No user with email"})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                console.log("Hello")
                return done(null, user);
            }else{
                return done(null, false, {message:"Password incorrect"});
            }
        }catch(ex){
            return done(ex);
        }
      
    }
    passport.use(new LocalStrategy({usernameField: 'email', password:"password"}, authenticateUser))
    passport.serializeUser((user,done)=>{});
    passport.deserializeUser((id,done)=>{});
}

module.exports = initialize;