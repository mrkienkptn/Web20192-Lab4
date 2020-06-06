$(document).ready(() => {
    // console.log("Ajax here")
    $("#search-input-employee").keyup(() => {
      
      $.ajax({
        async : false,
        url : "ajax-employee/",
        type : "GET",
        dataType : "json",
        success : (listuser) => {
            
          let input_key = $('#search-input-employee').val()
          $('#search_res').html('');
          $('.HomeHero').html('');
          for(let i = 0; i < listuser.length; i++){
            let data_src = listuser[i].name
            let id_employee = '#employee_'+i;
            let check = $('#employee_'+i).length;
            // console.log("input"+input_key)
            // console.log("======"+check)
            // console.log("======"+check)
            let sum =0;
                if(listuser[i].rating.length == 0) listuser[i].rating.length = 1;
            listuser[i].rating.forEach(e => {
              sum += e;
            })
            var appendIntoRes = "<div><img src='/images/faceui"+i%10+".jpg' alt='User_avt' class='user-avt'></div>"; 
            appendIntoRes = appendIntoRes + "<div class='info'>";
            appendIntoRes = appendIntoRes + "<p style='color:dodgerblue; font-size:20px'>"+listuser[i].name +"</p>";
            appendIntoRes = appendIntoRes + "<p style=' font-size:14px'>Price: "+listuser[i].other.price +"</p>";
            appendIntoRes = appendIntoRes + "<p style=' font-size:14px'>Rating :"+sum/listuser[i].rating.length +"</p>";
            appendIntoRes = appendIntoRes + "<p style=' font-size:14px'>Skills :"+listuser[i].other.skill +"</p></div>";
            appendIntoRes = appendIntoRes + "<div><a href='/detail-profile/"+listuser[i]._id.toString()+"' class='btn-success' style='background-color: dodgerblue;'>Profile</a></div>"

            if(data_src.toLowerCase().indexOf(input_key) != -1){
            //   console.log("ket qua: "+data_src.search(input_key))
                // console.log("chọn thẻ có id :" +i);
              
              if(!$('#employee_'+i).length){
                
                
                $('#search_res').append('<div class="employee-info" id ="employee_'+ i +'">'+appendIntoRes+'</div><br>');
                
                // $(id_employee).append("<div><img src='/images/faceui"+i%10+".jpg' alt='User_avt' class='user-avt'></div>") 
                // $(id_employee).append("<div class='info'>")
                
                // $(id_employee).append("<p style='color:dodgerblue; font-size:20px'>"+listuser[i].name +"</p>") 
                // $(id_employee).append("<p style=' font-size:14px'>Price: "+listuser[i].other.price +"</p>") 
                
                

                // $(id_employee).append("<p style=' font-size:14px'>Rating :"+sum/listuser[i].rating.length +"</p>") 
                // $(id_employee).append("<p style=' font-size:14px'>Skills :"+listuser[i].other.skill +"</p>") 

                // $(id_employee).append("<div><a href='/detail-profile/"+listuser[i]._id.toString()+"' class='btn-success' style='background-color: dodgerblue;'>Profile</a></div>") 
                // $(id_employee).append(appendIntoRes);
                
                // $('#search_res').append("")  
              }
  
  
            }
          }
          if($('#search_res').html() == ''){
              $('#search_res').append("<div>Sorry, Not Found</div>")  
          }
        }
      })
    })
    // $('#btn-search-employee').click(() =>{
    //   console.log('click search' + new Date())
    //   $.ajax(
    //     {
    //       url: "search_employee/",
    //       type: "GET",
    //       dataType: "json",
    //       success : (listuser) =>{
    //         console.log("Ajax success", listuser);
    //         $('.HomeHero').html('');
    //         $('#search_res').html('');
    //         for(let i = 0; i < listuser.length; i++){
    //           let id_employee = '#employee_'+i;
              
    //           // console.log($(id_employee.length));
  
    //           if(!$(id_employee).length){
    //             $('#search_res').append("<div class='job_each' id='job_" + i + "'><br>")  
    //             $(id_employee).append("<div class='job_name'><a href='/detail_employee/"+listuser[i]._id.toString() +"'>"+listuser[i].name +"</a></div>")  
    //             $(id_employee).append("<div class='job_price'>Price:  "+listuser[i].price +"</div>")  
    //             $(id_employee).append("<div class='job_candidate'>Candidate:  "+listuser[i].candidates +"</div>")  
    //             $(id_employee).append("<div class='job_require'>Requirement:  "+listuser[i].requirements +"</div>")  
    //             $(id_employee).append("<div class='name_user_post'>Post by:  "+listuser[i].userNamePost +"</div>")  
               
    //             $('#search_res').append("</div>")  
    //           }
  
    //         }
    //       }
    //     }
  
    //   );
  
    // })
    // $('#filter-icon').click(() =>{
    //             $('#filter_res').slideToggle()
  
  
  
    // })
  });