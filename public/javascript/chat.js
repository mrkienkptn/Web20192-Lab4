
$(function(){
    
    for (let order=0; order<=5; order++){
        $('#message.'+order).click(function() {
            const socket = io()
            console.log.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            let receiver_id =   ($(this).attr('value'))
            let receiver = {receiver_id: receiver_id}
            
            // join to chat 
            // set tab chat name to receiver name
            let worker_name = $("#worker-name-"+order).html()
            $("#chat-tab-name-"+order).html(worker_name)
            console.log(worker_name)
            //get current user id
            let me ={ id: $("#username p").attr("id")}
            console.log(me.id)
            // request to join in online list
            socket.emit("join-online", me )
           
    
            // 
            socket.emit('chat-with', receiver)
    
            // listen to message from server
            socket.on('message', message => {
                $("#all-message-"+order).append("<p class='message-left' >"+ message +"</p>")
            })
    
            // sendmessage to server
    
            
            $("#chat-form-"+order).submit(e=> {
    
                e.preventDefault()
                let message = $("#message-input-"+order).val()
                console.log(message)
                socket.emit('message', message)
                $("#message-input-"+order).val("")
                $("#all-message-"+order).append("<p class='message-right' >"+ message +"</p><br/>")
            })
    
            
        })
    }
})
