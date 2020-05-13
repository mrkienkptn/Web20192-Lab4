$(document).ready(() => {
  // console.log("Ajax here")
  $("#search-input-work").keydown(() => {
    
    $.ajax({
      url : "search_work/",
      type : "GET",
      dataType : "json",
      success : (data) => {
        let input_key = $('#search-input-work').val()
        $('#search_res').html('');
        $('.HomeHero').html('');
        for(let i = 0; i < data.length; i++){
          let data_src = data[i].name
          // let str_match = '/'+input_key+'/'
          // console.log(data_src)
        // let work_match = data_src.match('/'+input_key+'/g') 
          let id_job = '#job_'+i;
          
          

          console.log("input"+input_key)
          console.log(data_src)


          if(data_src.toLowerCase().indexOf(input_key) != -1){
            console.log(data_src.search(input_key))

            
            if(!$('#job_'+i).length){

              $('#search_res').append("<div class='job_each' id='job_" + i + "'><br>")  
              $(id_job).append("<div class='job_name'><a href='/detail_work/"+data[i]._id +"'>"+data[i].name +"</a></div>")  
              $(id_job).append("<div class='job_price'>Price:  "+data[i].price +"</div>")  
              $(id_job).append("<div class='job_candidate'>Candidate:  "+data[i].candidates +"</div>")  
              $(id_job).append("<div class='job_require'>Requirement:  "+data[i].requirements +"</div>")  
              $(id_job).append("<div class='name_user_post'>Post by:  "+data[i].userNamePost +"</div>")  
              $('#search_res').append("</div>")  
            }


          }
        }
        if($('#search_res').html() == ''){
            $('#search_res').append("<div class='empty-search'>Sorry, Not Found</div>")  
        }
      }
    })
  })
  $('#btn-search-work').click(() =>{
    // console.log('click search' + new Date())
    $.ajax(
      {
        url: "search_work/",
        type: "GET",
        dataType: "json",
        success : (data) =>{
          // console.log("Ajax success", data);
          $('.HomeHero').html('');
          $('#search_res').html('');
          for(let i = 0; i < data.length; i++){
            let id_job = '#job_'+i;
            
            // console.log($(id_job.length));

            if(!$(id_job).length){
              $('#search_res').append("<div class='job_each' id='job_" + i + "'><br>")  
              $(id_job).append("<div class='job_name'><a href='/detail_work/"+data[i]._id +"'>"+data[i].name +"</a></div>")  
              $(id_job).append("<div class='job_price'>Price:  "+data[i].price +"</div>")  
              $(id_job).append("<div class='job_candidate'>Candidate:  "+data[i].candidates +"</div>")  
              $(id_job).append("<div class='job_require'>Requirement:  "+data[i].requirements +"</div>")  
              $(id_job).append("<div class='name_user_post'>Post by:  "+data[i].userNamePost +"</div>")  
              $('#search_res').append("</div>")  
            }

          }
        }
      }

    );

  })
  $('#filter-icon').click(() =>{
      // if(!$('.filter-menu').length)
      //   $('#filter_res').append("<div class='filter-menu'>This is filter menu</div>")
      // else
      //   $('#filter_res').html('')
      $('#filter_res').fadeToggle()



  })
});