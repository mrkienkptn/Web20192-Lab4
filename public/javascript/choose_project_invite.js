$(document).ready(() =>{
  $('#all_project').hide()
  $('.invite_dev').click(function(){
    

    let dev_id = $('.invite_dev').val()
    console.log('dev id: '+ dev_id)
    $('#all_project').slideToggle()

    $('#all_project').children('form').submit(function(e){
      let project_id = $('.each_project').val()
      console.log('project id: '+ project_id)
      e.preventDefault()
      $.ajax({
        method : 'POST',
        url : "/post_invite_dev",
        data : {project_id : project_id, dev_id: dev_id},
        success : (data) => {
          
        }

      })
    })
  })
})