const password = document.getElementById("password");
    const passwordRetry = document.getElementById("passwordRetry");
    const submit = document.getElementById("btn");
    const message =document.getElementById("message")

    function validateMyForm(){
    if(password.value !== passwordRetry.value){

        message.innerHTML = "! Şifreler Uyuşmuyor";
        message.style.color = "red";
        password.style.border= "2px solid red";
        passwordRetry.style.border = "2px solid red";
        return false;
    }
    else{
        console.log("Else icinde")
        return true;
    }
    }
  
