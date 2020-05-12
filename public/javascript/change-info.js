$('.fill-info-form .question .close').click(()=>{
    console.log("aaa")
    $('.fill-info-form').css({
        "display":"none",
        "z-index":-1
    })
    $('.profile').css({
        "z-index":1
    })
    $('.overlay').css({
        "z-index":-2
    })
})
$('.profile .change-prof button').click(()=>{
    console.log("bbb")
    $('.fill-info-form').css({
        "display":"block",
        "z-index":1

    })
    $('.profile').css({
        "z-index":-1
    })
    $('.overlay').css({
        "z-index":0
    })
})
$('.change_intro').hide()
$('#change_intro').click((e)=>{
    $(".change_intro").toggle()
    e.stopPropagation()
})
$('.change_intro').submit(()=>{
    $(this).hide()
})

