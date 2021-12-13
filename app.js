const express = require('express');
const { controller } = require('./controllers/controller.js')
const bodyParser = require('body-parser')
const app = express();

const { body, validationResult } = require('express-validator');
app.set('view engine', 'ejs'); // html dosyalarını ejs olarak değiştiriyoruz ve içinde javascript yazabiliyoruz
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

/*Not : 1-) Eksik kısımlar modüller oluşturulduktan sonra eklenecek !!
        2-) Email kontrolü yapılmadı, onu veritabanına kaydederken kontrol et */


//veritabanı başlatma require edilip veritabanı başlatılacak                     (Eksik)
//webUserController require edilip get-post metodları arasında çağırılacak       (Eksik)

const port = 8080;

app.listen(port, () => {
    console.log("Server started working")
})

app.use(express.static('public'))

app.get('/', (req, res) => {

    controller.getHomepage(req, res)
})

app.get('/home', (req, res) => {
    res.redirect('/')               //yönlendirme (sanki / isteği gelmiş gibi ona yönlendiriyor)
})

//postman body içinde mutlaka email ve şifre gönderilecek
app.get("/login", (req, res) => {

    controller.getLogin(req, res)

})
//postman body içinde mutlaka ad,soyad,email,şifre gönderilecek
app.get("/signUp", (req, res) => {

    controller.getSignUp(req, res)

})

//query string ile email gönderilcek, gönderim şekli ?email=email123@gmail.com (postman params'a yazılıcak)
app.get('/resetPassword', (req, res) => {

    controller.getResetPassword(req, res)

})

app.post('/setSignUp',
    body('name').notEmpty().withMessage("Name Boş Bırakılamaz !!!"),
    body('surname').notEmpty().withMessage("Surname Boş Bırakılamaz !!!"),
    body('email').notEmpty().withMessage("Email Boş Bırakılamaz !!!"),
    body('password').notEmpty().withMessage("Password Boş Bırakılamaz !!!"),
    body('username').notEmpty().withMessage("Username Boş Bırakılamaz !!!")
    , (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("error if icinde");
            return res.status(400).json({ errors: errors.array() });
        }
        controller.setSignUp(req, res)

    })



app.use((req, res) => {
    controller.getError(req, res)
})