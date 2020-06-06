$(document).ready(() => {
  // console.log("Ajax here")
  $("#search-input-work").keydown(() => {

    $.ajax({
      url: "search_work/",
      type: "GET",
      dataType: "json",
      success: (data) => {
        let input_key = $('#search-input-work').val()
        $('#search_res').html('');
        $('.HomeHero').html('');
        for (let i = 0; i < data.length; i++) {
          let data_src = data[i].name

          let id_job = '#job_' + i;



          console.log("input" + input_key)
          console.log(data_src)


          if (data_src.toLowerCase().indexOf(input_key) != -1) {
            console.log(data_src.search(input_key))


            if (!$('#job_' + i).length) {

              $('#search_res').append("<div class='job_each' id='job_" + i + "'>")
              $(id_job).append("<div class='job_name'><a href='/detail_work/" + data[i]._id.toString() + "'>" + data[i].name + "</a></div>")

              $(id_job).append("<div class='xxxx'>")
              $( id_job+" .xxxx").append("<input id='project-id' type='hidden' name='work_id' value='" + data[i]._id + "' >")

              $(id_job+" .xxxx").append("<div class='job_price'>  <i class='fas fa-donate'></i> &nbsp;" + data[i].price + "</div>")
              $(id_job+" .xxxx").append("<div class='job_candidate'><i class='fas fa-poll-people'></i> -&nbsp;  " + data[i].candidates + "</div>")          
              $(id_job+" .xxxx").append("<div class='job_user_post'> &nbsp; <p style='color: green; font-weight: bolder; display: inline;' ></p></div>")
              $(id_job).append("</div>")
              $(id_job).append("<div class='job_descrip'>") //ii

              $(id_job+" .job_descrip").append("<div class='job_descrip_head'>Description</div>")
              $(id_job+" .job_descrip").append("<div class='job_descrip_detail' >" + data[i].description + "</div>")
          


              $(id_job).append("</div>") //ii
              $(id_job).append("<div class='job_require'> Requirements - &nbsp;")
              for (let j = 0; j < data[i].requirements.length; j++) {
                $(id_job+" .job_require").append("<label>" + data[i].requirements[j] + "</label>")
              }
              $(id_job).append("</div>")
              $('#search_res').append("</div>")
            }


          }
        }
        if ($('#search_res').html() == '') {
          $('#search_res').append("<div class='empty-search'>Sorry, Not Found</div>")
        }
      }
    })
  })
  $('#btn-search-work').click(() => {
    console.log('click search' + new Date())
    $.ajax(
      {
        url: "search_work/",
        type: "GET",
        dataType: "json",
        success: (data) => {
          console.log("Ajax success", data);
          $('.HomeHero').html('');
          $('#search_res').html('');
          for (let i = 0; i < data.length; i++) {
            let id_job = '#job_' + i;

            // console.log($(id_job.length));

            if (!$('#job_' + i).length) {

              $('#search_res').append("<div class='job_each' id='job_" + i + "'>")
              $(id_job).append("<div class='job_name'><a href='/detail_work/" + data[i]._id.toString() + "'>" + data[i].name + "</a></div>")

              $(id_job).append("<div class='xxxx' >")
              $(id_job).append("<input id='project-id' type='hidden' name='work_id' value='" + data[i].id + "' >")

              $(id_job).append("<div class='job_price'>  <i class='fas fa-donate'></i> &nbsp;" + data[i].price + "</div>")
              $(id_job).append("<div class='job_candidate'><i class='fas fa-poll-people'></i> -&nbsp;  " + data[i].candidates + "</div>")
              $(id_job).append("<div class='job_require'>Requirement:  " + data[i].requirements + "</div>")
              $(id_job).append("<div class='job_user_post'>Post by - &nbsp; <p style='color: green; font-weight: bolder; display: inline;' >" + data[i].userNamePost + "</p></div>")
              $(id_job).append("</div>")
              $(id_job).append("<div class='job_descrip'>") //ii

              $(id_job).append("<div class='job_descrip_head'>Description</div>")
              $(id_job).append("<div class='job_descrip_detail' >" + data[i].description + "</div>")
              $(id_job).append


              $(id_job).append("</div>") //ii
              $(id_job).append("<div class='job_require'> Requirements - &nbsp;")
              for (let j = 0; j < data[i].requirements.length; j++) {
                $(id_job).append("<label>" + data[i].requirements[j] + "</label>")
              }
              $(id_job).append("</div>")
              $('#search_res').append("</div>")
            }


          }
        
        if($('#search_res').html() == ''){
      $('#search_res').append("<div class='empty-search'>Sorry, Not Found</div>")
    }
  }
      }

);

  })
$('#filter-icon').click(() => {
  // if(!$('.filter-menu').length)
  //   $('#filter_res').append("<div class='filter-menu'>This is filter menu</div>")
  // else
  //   $('#filter_res').html('')
  $('#filter_res').slideToggle()



})
});