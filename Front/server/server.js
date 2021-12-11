const express  = require('express');
const app = express();

/*Not : 1-) Eksik kısımlar modüller oluşturulduktan sonra eklenecek !!
        2-) Email kontrolü yapılmadı, onu veritabanına kaydederken kontrol et */


//veritabanı başlatma require edilip veritabanı başlatılacak                     (Eksik)
//webUserController require edilip get-post metodları arasında çağırılacak       (Eksik)

const port =8080;

//postman body içinde mutlaka email ve şifre gönderilecek
app.post("/api/login",(req,res)=>{

})
//postman body içinde mutlaka ad,soyad,email,şifre gönderilecek
app.post("/api/signUp",(req,res)=>{

})

//query string ile email gönderilcek, gönderim şekli ?email=email123@gmail.com (postman params'a yazılıcak)
app.get('/api/resetPassword',(req,res)=>{
    
})
//postman içinde params ile anlık username gönderilecek ve kayıtlı olup olmadığı sorgusu yapılacak 
app.get('/api/usernameQuery')


app.listen(port , ()=>{
    console.log("Server started working")
})