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
        let sender = "aaa"
        console.log("Connect to socket: " + socket.id)
        

        socket.on('join-online', async requestUser => {
            
            joinOnline(socket.id, requestUser.id) 
            // console.log(user.userId + "join to chat")
            sender = requestUser.id
        })
       
        
        socket.on('send-message', async ( {receiver , message}) => {
            console.log("message from client: " + message)
            //save to database
            let receiverId = receiver
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
                    })
                    
                }
                else{
                    
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
                
                console.log("send mmesage:  " + message + " to " + receiverSocketId+" |>>  sender: "+sender)
                io.to(receiverSocketId).emit('listen-message', {sender: sender, message: message})
            }
        })
            
        socket.on('hand-shake1', data => {
            // console.log(data)
            let receiver = data.remoteId
            let signal = data.signal
            
            let receiverSkId = getReceiverSocket(receiver)
            console.log("hand shake with "+ receiverSkId)
            io.to(receiverSkId).emit('hand-shake2', {signal: signal, sender: sender})
        })
        socket.on('hand-shake3', data => {
            let receiver = data.remoteId
            let signal = data.signal

            let receiverSkId = getReceiverSocket(receiver)
            io.to(receiverSkId).emit('done-handshake', signal)
        })
    
        
        
    })
}
