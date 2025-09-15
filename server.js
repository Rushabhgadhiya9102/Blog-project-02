const dotenvx = require('@dotenvx/dotenvx')
const express = require('express')
const bodyParser = require('body-parser')
const database = require('./configs/database')
const session = require('express-session')
const { router } = require('./routers')
const passport = require('./middleware/passport')
const LocalStrategy = require('./middleware/passport')
const app = express()
dotenvx.config('.env')
const port = process.env.PORT


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret:'user',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
// app.use('/uploads', express.static('uploads'))
app.use('/',router)

app.listen(port, (error)=>{
    if(error){
        console.log(error.message);
        
    }else{
        database()
        console.log("server is started");
        console.log("http://localhost:" + port);
           
    }
})