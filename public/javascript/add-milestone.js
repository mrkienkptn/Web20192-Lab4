

$(".form-add-mstone").hide()
$(".btn-add-mstone").click(function(){
    $(".form-add-mstone").show()

})
setTimeout(function(){
    $(".add-status").hide()
}, 4000)
$(".review-submited").hide()
$(".review-pay-btn").click(function (e) {

    $('body').append("<div class='overlay'></div>")
    $(".form-add-mstone").hide()
    $(".review-pay-btn").css({
        'z-index': -99
    })
    $(this).siblings(".review-submited").show()
})
$(".close-review").click(function (e) {
    $(".review-submited").hide()
    $(".form-add-mstone").css({
        'z-index': 1
    })
    $(".review-pay-btn").css({
        'z-index': 1
    })
    $(".overlay").hide()
})

$(".pay-stone").submit(function(e){
    e.preventDefault()
    let milestoneId = $(this).children(".milestone-id").val()
    console.log(milestoneId)
    let money = $(this).children(".money").val()
    console.log(money)

    $.ajax({
        url: '/pay-for-freelancer-milestone',
        method: 'POST',
        data : {milestoneId: milestoneId, price: money},
        success : result=>{
            console.log(result)

            location.reload()
        }
    })

})