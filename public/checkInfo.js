
function check(){

    let fullname=$("#fullname").val()
    let username=$("#username").val()
    let password=$("#password").val()
    let confirm =$("#confirm-password").val()

    let fullNameAlert=$("#fullname-alert")
    let usernameAlert=$("#username-alert")
    let passwordAlert=$("#password-alert")
    let confirmAlert =$("#confirm-password-alert")

    let c1=true, c2=true, c3=true, c4=true
    //fullname
    if (!fullNameAlert &&! fullname.match("^([a-zA-Z]{5,})$")) {
        $("<p class=\"alert\" id =\"fullname-alert\">Invalid<p>").insertAfter("#fullname")
        c1=false
        alert("deeee")
    }
    if (fullNameAlert && fullname.match("^([a-zA-Z]{5,})$")) {
        fullNameAlert.remove()
    }
    //username
    if ( !usernameAlert && username.length<6) {
        $("<p class=\"alert\" id =\"username-alert\">At least 6 characters<p>").insertAfter("#username")
        c2=false
        alert("deeee")
    }
    if ( usernameAlert && username.length>=6) {
        usernameAlert.remove()
    }
    //password
    if ( !passwordAlert && password.length<6) {
        $("<p class=\"alert\" id =\"password-alert\">At least 6 characters<p>").insertAfter("#password")
        c3=false
    }
    if ( passwordAlert && password.length>=6) {
        passwordAlert.remove()
    } 
    //confirm-password
    if ( !confirmAlert && confirm!== password) {
        $("<p class=\"alert\" id =\"confirm-password-alert\">Do not match<p>").insertAfter("#confirm-password")
        c4=false
    }
    if ( confirmAlert && confirm=== password) {
        confirmAlert.remove()
    }
    //sign up button
    if (c1 && c2 && c3 && c4)
        $("#submit").attr("disabled", false)
    else 
        $("#submit").attr("disabled", true)
}