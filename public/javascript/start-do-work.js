let peer1 = new SimplePeer() // for employee share screen

let remoteId = "00000"


$(".done button").click(function (e) {
    remoteId = $(this).attr("value")
    let jobName = $(this).siblings('input').val().trim()
    let workerName = $("#username p").html().trim()
    navigator.mediaDevices.getDisplayMedia({
        video: {
            frameRate: 100
        },
        audio: false
    }).then(stream => {
        peer1 = new SimplePeer({ initiator: true, stream: stream })
        //receive object from signaling server
        peer1.on('signal', data => {
            console.log(" step1: remote id: " + remoteId)
            socket.emit('hand-shake1', { signal: data, remoteId: remoteId, jobName: jobName, workerName:workerName })
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

socket.on('hand-shake2', dataaa => {

    let peerX = new SimplePeer()

    console.log("Peeeeeeeeeeeeeeeeeeeeeeeeeeeeeer ")
    // peerActive[i] = true
    let signali = "kkk"

    //rec signal that sent by peer 1 from server
    // console.log(data)
    let jobName = dataaa.jobName
    let workerName = dataaa.workerName
    let signal = dataaa.signal
    peerX.signal(signal)
    signali = dataaa.sender


    // rec signal after connect to peer 1
    // send this signal to peer 1
    peerX.on('signal', data => {
        console.log("XXXXXXXXXXXXXXXXXXXXX " + signali)
        socket.emit('hand-shake3', { signal: data, remoteId: signali })
    })

    // rec signal send by peer2 from server
    // connect by this signal/
    // done 3-hand-shake
    peerX.on('stream', stream => {
        let confir = confirm(workerName+" is starting do "+ jobName)
        if (confir){
            let videoDiv = document.createElement('div')
            let titleDiv = document.createElement('div')
            let title = workerName+" -is doing "+jobName
            titleDiv.innerHTML = title

            videoDiv.appendChild(titleDiv)
            let video = document.createElement('video')
            let newWindow = window.open('', '_blank')
            
            video.setAttribute('width', '350')
            video.setAttribute('height', '300')

            video.setAttribute('controls', 'true')
            video.srcObject = stream
            
            // document.getElementById('receive-sc-share').appendChild(video)
            videoDiv.appendChild(video)
            

            
            newWindow.document.body.append(videoDiv)
            newWindow.document.title = 'Job'
            video.play()
        }
    })
    peerX.on('close', ()=>{
        console.log("Closessssed")
    })

})

socket.on('done-handshake', data => {
    console.log(data)
    peer1.signal(data)
})
