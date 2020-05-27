const socketio = require("socket.io")
const app = require("express")()
const server = require("http").Server(app)
const io = socketio(server)

const{
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require("../utils/chat-utils")

module.exports=(ioo, sserver)=>{
    io.on("connection", socket=>{


        socket.on("joinChat", ({username, room}) =>{

            // Send a notify when a user join in the chat

            const user = userJoin(socket.id, username, room)
            socket.join(user.room)
            socket.broadcast
                .to(user.room)
                .emit('message', `${user.username} is in chat`)
            
            // 

        } )

        //Listen for chat msg

        socket.on('chatMessage', msg => {
            const user = getCurrentUser(socket.id)

            io.to(user.room)
            .emit('message', msg)
        })

        socket.on("disconnect", ()=>{
            const user = userLeave(socket.id)
            if (user){
                io.to(user.room)
                .emit('message', `${user.username} has left the chat`)

                io.to(user.room)
                .emit('roomUsers')
            }


        })







    })
}