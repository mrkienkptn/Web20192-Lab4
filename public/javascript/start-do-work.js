
let peer2 = new SimplePeer()
let peer1 = new SimplePeer()
let remoteId = "00000"
console.log("iiiiiiiiiii")

$(".done button").click(function (e) {
    remoteId = $(this).attr("value")
    navigator.mediaDevices.getDisplayMedia({
        video: {
            frameRate: 100
        },
        audio: false
    }).then(stream => {
        peer1 = new SimplePeer({ initiator: true, stream: stream })
        //receive object from signaling server
        peer1.on('signal', data => {
            console.log(" step1: remote id: "+ remoteId)
            socket.emit('hand-shake1', {signal: data, remoteId: remoteId})
        })

        let video = document.getElementById("employee-screen")

        video.srcObject = stream
        video.css({
            'position': 'fixed',
            'bottom': '0',
            'right': '0'
        })
        video.play()
        
    })
})

// rec signal from signaling server
// send it to peer 2



let signal2 = "kkk"

//rec signal that sent by peer 1 from server
socket.on('hand-shake2', data => {
    console.log(data)
    let signal = data.signal
    peer2.signal(signal)
    signal2 = data.sender    
})

// rec signal after connect to peer 1
// send this signal to peer 1
peer2.on('signal', data => {
    console.log("XXXXXXXXXXXXXXXXXXXXX "+ signal2)
    socket.emit('hand-shake3', {signal: data, remoteId: signal2} )
})

// rec signal send by peer2 from server
// connect by this signal/
// done 3-hand-shake
socket.on('done-handshake', data => {
    console.log(data)
    peer1.signal(data)
})

peer2.on('stream', stream => {
    let video = document.createElement('video')
    video.setAttribute('width', '350')
    video.setAttribute('height', '300')
    
    video.setAttribute('controls', 'true')
    document.getElementById('receive-sc-share').appendChild(video)
    
    video.srcObject = stream
    video.play()
})

