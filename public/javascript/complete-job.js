$(".bill").hide()

let jobId = ""
$(".mark-completed").click(function(){
    $(this).siblings(".bill").show()
    
})

$(".bill").submit(function(e){
    e.preventDefault()
    let value = $(this).siblings('button').attr('value').split(",")
    let workerId = value[0]
    let projectCompleteId = value[1]
    let money = $(this).children('#bill-money').val().
    console.log(money)
    let posting = $.post('/completed-job/'+projectCompleteId, {
        workerId: workerId,
        projectCompleteId: projectCompleteId,
        price: money
    })
    posting.done(data => {
        $(this).siblings(".work-status").html(data.status)
    })
})