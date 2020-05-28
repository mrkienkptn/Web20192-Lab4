

const socket = io()
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
let me ={ id: $("#username p").attr("id").trim()}
socket.emit("join-online", me )
console.log(me.id)
for (let order=0; order<=5; order++){
    $('.'+order).click(function() {
        $(".chat-tab-right .message").html("")
        let receiver_id =   ($(this).attr('value'))
        let receiver = {receiver_id: receiver_id}
        
        // join to chat 
        // set tab chat name to receiver name
        let worker_name = $("#worker-name-"+order).html()
        $("#chat-tab-name-"+order).html(worker_name)

        let client_name = $("#client-name-"+order).html()

        $(".client-name-right").html(client_name)
        // 
        // socket.emit('chat-with', receiver)

        // listen to message from server
        socket.on('message', message => {
            // $("#all-message-"+order).append("<p class='message-left' >"+ message +"</p>")
            $(".chat-tab-right .message").append("<p>"+message+"</p>")
            console.log(message)
            $("#all-message-"+order).append("<p class='message-right' >"+ message +"</p><br/>")
            $(".chat-tab-right .message").scrollTop = $(".chat-tab-right .message").scrollHeight
        })
        $(".chat-tab-right form").submit(e=>{
            e.preventDefault()
            let message = $("#msg").val()
            console.log(message)
            socket.emit('message', {receiver ,message})
            $("#msg").val("")
            $(".chat-tab-right .message").append("<p class='message-right' >"+ message +"</p><br/>")
        })
        $("#chat-form-"+order).submit(e=> {

            e.preventDefault()
            let message = $("#message-input-"+order).val()
            console.log(message)
            socket.emit('message', {receiver ,message})
            $("#message-input-"+order).val("")
            $("#all-message-"+order).append("<p class='message-right' >"+ message +"</p><br/>")
        })

        
    })
}

