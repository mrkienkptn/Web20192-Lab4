const{
    joinOnline,
    getReceiverSocket,
    userLeave
} = require("../utils/chat-utils")
const moment = require("moment")

const Message = require("../app/models/message")

module.exports = (server)=>{
    const io = require("socket.io")(server)

    io.on("connection",socket=>{
        socket.on("disconnect",() => {
            userLeave(socket.id)
            console.log(" exit")
        })
        console.log("Connect to socke: " + socket.id)
        sender = "aaa"

        socket.on('join-online', async requestUser => {
            
            joinOnline(socket.id, requestUser.id) // return {socketId, userId}
            // console.log(user.userId + "join to chat")
            sender = requestUser.id
        })
       
            
            socket.on('message', async ( {receiver , message}) => {
                console.log(message)
                //save to database
                let receiverId = receiver.receiver_id
                console.log("receive id: "+ receiverId)
        
                //get receiver from online user list
                let receiverSocketId = getReceiverSocket(receiverId)
                await Message.findOne({sender: sender, receiver: receiverId}, async (err, doc) =>{
                    if (err) throw err
                    if (!doc){
                        // console.log("dialog not exist")
                        let dialog = new Message()
                        dialog.sender = sender
                        dialog.receiver = receiverId
                        dialog.messages = {time: [].push(Date.now()), content: [].push(message)}
                        dialog.save(err =>{
                            if (err) console.log("Save err "+err)
                            // else console.log("save done "+message)
                        })
                        
                    }
                    else{
                        // console.log(doc)
                        // console.log("dialog exist")
                        let currentContent = doc.messages.content
                        let currentTime = doc.messages.time
                        if (currentContent!=undefined){
                            currentContent.push(message)
                        }
                        if (currentTime!=undefined){
                            currentTime.push(Date.now())
                        }
                        await Message.findOneAndUpdate({sender: sender, receiver: receiverId},
                            {
                                messages:{
                                    time   : currentTime,
                                    content: currentContent
                                }
                            })
                        
                    }
                })

                if (receiverSocketId){
                    console.log("senmmesage  "+message+" to "+ receiverSocketId)
                    io.to(receiverSocketId).emit('message', message)
                }
            })
            
      
    
        
        
    })
}
