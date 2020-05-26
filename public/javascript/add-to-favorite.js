$(function(){
    $("#add-to-favorite").click((e)=>{
        let projectId = $("#project-id").val()
        let posting = $.post('/add_to_favorite', {id: projectId})
        posting.done((status)=>{
            if (status.status) $("#add-to-favorite").css({
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
