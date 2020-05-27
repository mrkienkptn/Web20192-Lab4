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
const client       = require ('./routes/client')
const auth         = require ('./routes/auth')
var   db           = require("./config/database").URI
var favicon        = require('serve-favicon')


mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>console.log("Database is connected"))
.catch(err=>console.log(err))

app.use(favicon(path.join(__dirname, 'public/images/Capture.ico')))

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

app.use('/', employee);
app.use('/', project);
app.use('/', client)
// app.use('/auth',auth);
const {
    joinOnline,
    getCurrentUser,
    userLeave,
    getRoomUsers
  } = require("./utils/chat-utils")
var server = require("http").Server(app)
var io = require("socket.io")(server)

io.on("connection",socket=>{
    console.log("Connect to socket: " + socket.id)

    socket.on('join-online', requestUser => {
        let user = joinOnline(socket.id, requestUser.id) // return {socketId, userId}
        console.log(user.userId + "join to chat")
    })

    socket.on('chat-with', receiver => {
        let receiverId = receiver.receiver_id
        console.log("receive id: "+ receiverId)
        let receiverObject = getCurrentUser(receiverId)
        let receiverSocketId = receiverObject.socketId
        console.log("receiver id: "+ receiverId)
        socket.on('message', message => {
            console.log(message)
            io.to(receiverSocketId).emit('message', message)
        })
        
    })

    socket.on("disconnect", () => {
        const user = userLeave(socket.id)

    })
    
})
server.listen(port, console.log("Server is running on port 7000") )