const express      = require("express")
const app          = express()
const port         = process.env.PORT || 7000
const mongoose     = require("mongoose")
const passport     = require("passport")
var   flash        = require("connect-flash")
const path         = require('path')
const morgan       = require("morgan")
var   cookieParser = require("cookie-parser")
var   bodyParser   = require("body-parser")
var   session      = require("express-session")
const employee     = require ('./routes/employee')
const project      = require ('./routes/project')
const auth         = require ('./routes/auth')
var   db           = require("./config/database").URI



mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>console.log("Database is connected"))
.catch(err=>console.log(err))

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret:"ngaiKienDepTrai",
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./routes/auth')(app, passport)
require('./config/passport')(passport)

app.use('/',employee);
app.use('/',project);
// app.use('/auth',auth);

app.listen(port, console.log("Server is running on port 7000") )