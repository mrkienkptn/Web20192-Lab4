const express = require("express")
const app = express()
const port = process.env.PORT || 8000
const mongoose = require("mongoose")
const passport = require("passport")
var flash = require("connect-flash")

const morgan = require("morgan")
var cookieParser = require("cookie-parser")
var bodyParser = require("body-parser")
var session = require("express-session")

var configDB = require("./config/database")

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(session({secret:"ngaiKienDepTrai"}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./app/routes')(app, passport)
app.listen(port, console.log("Server is running on port 8000") )