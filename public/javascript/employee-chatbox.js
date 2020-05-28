function change(){
    const boundHeight = $(".chat-tab-right-bound").height()
    console.log(boundHeight)
    const boundWidth = $(".chat-tab-right-bound").width()
    
    for (let i=0; i<=10; i++){
        $(".client-"+i).click(function(e){
            $("#chat-tab-right-"+i).height(boundHeight)
            $("#chat-tab-right-"+i).slideDown()   
            $("#chat-tab-right-"+i).height(boundHeight)
            $(".form-"+i).css({
                "position": "absolute",
                "bottom": "0px"

            })
            
            for(let j=0; j<=10; j++){
                if (j!==i) $("#chat-tab-right-"+j).hide()
            }
        })
    }

}
$(function(){
    $(".chat-tab-right").hide()
    change()
    $(window).resize(()=>{
        change()
    })
})
