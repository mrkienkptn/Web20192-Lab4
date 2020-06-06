function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  function openFilter() {
    var button = document.getElementById("employee_filter");
     
     if(button.style.display === "none" || button.style.display === ""){
      button.style.display = "grid";
     }
     else{
      button.style.display = "none";
     }
      // document.getElementById("employee_filter").style.display = "grid";
      // display = 1;
    
  }
  
  function closeFilter() {
    document.getElementById("employee_filter").style.display = "none";

    display = 0;
  }