const password = document.getElementById("password");
const passwordRetry = document.getElementById("passwordRetry");
const submit = document.getElementById("btn");
const warning = document.getElementsByClassName("warning");

passwordRetry.addEventListener("keypress",()=>{
   document.getElementById("btn").style.pointerEvents="auto";
   document.getElementById("btn").style.opacity="1";
   
})
function validateMyForm(){
   if(password.value !== passwordRetry.value){
      document.getElementById("message").innerHTML = "! Şifreler Uyuşmuyor";
      password.style.border= "2px solid red"; 
      passwordRetry.style.border = "2px solid red";
      return false;
   }
   else{
      return true;
   }
}
  
