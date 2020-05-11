$(document).ready(() => {
  console.log("Ajax here")
  $(".search-input").keyup(() => {
    
    $.ajax({
      url : "search/",
      type : "GET",
      dataType : "json",
      success : (data) => {
        for(let i = 0; i < data.length; i++){
          if(data[i].name == $('.search-input').val()){
            $('#search_res').html('');
            if(!$('#job_'+i).length){
              $('#search_res').append("<div id='job_" + i + "'>")  
              $('#search_res').append("<div class='job_name'>"+data[i].name +"</div>")  
              $('#search_res').append("<div class='job_price'>"+data[i].price +"</div>")  
              $('#search_res').append("<div class='job_candidate'>"+data[i].candidates +"</div>")  
              $('#search_res').append("<div class='job_require'>"+data[i].requirements +"</div>")  
              $('#search_res').append("</div>")  
            }


          }
        }
      }
    })
  })
  $('#btn-search').click(() =>{
    // console.log('click search' + new Date())
    $.ajax(
      {
        url: "search/",
        type: "GET",
        dataType: "json",
        success : (data) =>{
          console.log("Ajax success", data);
          for(let i = 0; i < data.length; i++){
            
            let id_job = '#job_'+i;
            console.log($(id_job.length));

            if(!$(id_job).length){
              $('#search_res').append("<div id='job_" + i + "'>")  
              $('#search_res').append("<div class='job_name'>"+data[i].name +"</div>")  
              $('#search_res').append("<div class='job_price'>"+data[i].price +"</div>")  
              $('#search_res').append("<div class='job_candidate'>"+data[i].candidates +"</div>")  
              $('#search_res').append("<div class='job_require'>"+data[i].requirements +"</div>")  
              $('#search_res').append("</div>")  
            }

          }
        }
      }

    );

  })
});