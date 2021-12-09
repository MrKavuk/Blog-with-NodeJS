const password = document.getElementById("password");
const passwordRetry = document.getElementById("passwordRetry");
const submit = document.getElementById("btn");
passwordRetry.addEventListener("keypress",()=>{
   document.getElementById("btn").style.pointerEvents="auto";
   document.getElementById("btn").style.opacity="1";
   
})
function validateMyForm(){
   if(password.value !== passwordRetry.value){
      alert("Şifreler Aynı değil")
      return false;
   }
   else{
      return true;
   }
}
  
