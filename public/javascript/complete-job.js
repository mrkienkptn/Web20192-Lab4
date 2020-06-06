$(".bill").hide()

let jobId = ""
$(".mark-completed").click(function(){
    $(this).siblings(".bill").slideToggle()
    
})

$(".bill").submit(function(e){
    e.preventDefault()
    let value = $(this).siblings('button').attr('value').split(",")
    let workerId = value[0]
    let projectCompleteId = value[1]
        let posting = $.post('/completed-job/'+projectCompleteId, {
        workerId: workerId,
        projectCompleteId: projectCompleteId,
        
    })
    posting.done(data => {
        $(this).siblings(".work-status").html(data.status)
        if (data.vaid) {
            $(this).siblings(".work-status").css({'color': 'green'})
        }
        else{
            $(this).siblings(".work-status").css({'color': 'red'})
        }
    })
})