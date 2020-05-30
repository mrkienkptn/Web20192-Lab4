$(function(){
    $("#add-to-favorite").click(function(e){
        let projectId = $("#project-id").val()
        let posting = $.post('/add_to_favorite', {id: projectId})
        posting.done((status)=>{
            console.log(status)
            if (status.status) $(this).css({
                "background-color":"green"
            })
        })
    })
    // $("#remove-from-favorite").click(e=>{
    //     let projectId = $("#project-id").val()
    //     let posting = $.post('/remove_from_favorite', {id: projectId})
    //     posting.done((status)=>{
            
    //         })
    //     })
    // })
})
