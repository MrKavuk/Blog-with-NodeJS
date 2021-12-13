const express  = require('express');
const {controller} = require('./controllers/controller.js')
const app = express();

app.set('view engine','ejs'); // html dosyalarını ejs olarak değiştiriyoruz ve içinde javascript yazabiliyoruz


/*Not : 1-) Eksik kısımlar modüller oluşturulduktan sonra eklenecek !!
        2-) Email kontrolü yapılmadı, onu veritabanına kaydederken kontrol et */


//veritabanı başlatma require edilip veritabanı başlatılacak                     (Eksik)
//webUserController require edilip get-post metodları arasında çağırılacak       (Eksik)

const port =8080;

app.listen(port , ()=>{
    console.log("Server started working")
})

app.use(express.static('public'))

app.get('/',(req,res)=>{

    controller.getHomepage(req,res)
})

app.get('/home',(req,res)=>{ 
    res.redirect('/')               //yönlendirme (sanki / isteği gelmiş gibi ona yönlendiriyor)
})

//postman body içinde mutlaka email ve şifre gönderilecek
app.get("/login",(req,res)=>{

    controller.getLogin(req,res)

})
//postman body içinde mutlaka ad,soyad,email,şifre gönderilecek
app.get("/signUp",(req,res)=>{
    
    controller.getSignUp(req,res)

})

//query string ile email gönderilcek, gönderim şekli ?email=email123@gmail.com (postman params'a yazılıcak)
app.get('/resetPassword',(req,res)=>{
    
    controller.getResetPassword(req,res)

})
//postman içinde params ile anlık username gönderilecek ve kayıtlı olup olmadığı sorgusu yapılacak 
app.get('/usernameQuery')


app.use((req,res)=>{
    controller.getError(req,res)
})