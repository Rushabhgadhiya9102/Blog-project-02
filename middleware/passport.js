const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const UserData = require('../models/userSchema')

// ------------ passport local --------------- //

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) =>{

        try {
            const user = await UserData.findOne({email})
            if(!user) return done(null, false, {message: "User Not Found"})

            const isValid = await bcrypt.compare(password, user.password)
            if(!isValid) return done(null, false, {message: "Password is invalid"})
                
            return done(null, user)    
        } catch (error) {
            return done(error.message);
            
        }

    })
)

// -------------- serialize -------------- //

passport.serializeUser((user, done)=>done(null, user.id))

// -------------- deserialize -------------- //

passport.deserializeUser(async(id, done)=>{
    try {
       const user = await UserData.findById(id)
       return done(null, user)
    } catch (error) {
       return done(error.message)
    }
})

// ------------ userauth ------------- //

passport.userAuth = (req,res,next)=>{

    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        res.locals.user = req.user
        return next()
    }
    res.redirect('/login')
}

// ------------ logout -------------- //

passport.logout = (req,res,next)=>{

    req.logout((error)=>{

        if(error){
            return res.redirect('/errorPage')
        }

        res.redirect('/login')

    })
    
}

module.exports = passport