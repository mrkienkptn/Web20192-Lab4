const socket = io()

let me ={ id: $("#username p").attr("id").trim()}
socket.emit("join-online", me )
console.log(me.id)


// employee to client


for (let i=0; i<=10; i++){
    let cl_id = $(".client-"+i).attr("value")  
    $("#chat-tab-right-"+i+ " form").submit(e=>{
        e.preventDefault()
        let message = $("#msg-"+i).val()
        console.log(message)
        socket.emit('send-message', {receiver: cl_id ,message: message})
        $("#msg-"+i).val("")
        $("#all-message-"+cl_id).append("<p class='message-right' >"+ message +"</p>")
    })
}

//client to employee



for (let i=0; i<=10; i++){
    let employee_id = $(".employee-"+i).attr("value")  

        $("#chat-form-"+i).submit(e=> {
            e.preventDefault()
            let message = $("#message-input-"+i).val()
            console.log(message)
            //send message to server
            socket.emit('send-message', {receiver: employee_id, message: message})
            // input to empty
            $("#message-input-"+i).val("")
            // append just sent message to dialog box
            $("#all-message-"+employee_id).append("<p class='message-right' >"+ message +"</p>")
            
        })
}

socket.on('listen-message', ({sender, message}) => {
    console.log(message+"okokok")
    console.log(sender)
    $("#all-message-"+sender).append("<p class='message-right' >"+ message +"</p")

}) 

