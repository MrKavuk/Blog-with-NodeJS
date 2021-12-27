const express = require('express');
const app = express();
const {connectionHelper} = require('./dbconnect/connectionHelper')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const cookieParser = require("cookie-parser")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var uuid = require('uuid');
var path = require('path')

const multer = require('multer')
const fileStorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v1() + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage : fileStorageEngine })



// routers require
const {routerHome} = require('./routes/homeRoutes')
const {routerAuth} = require('./routes/authRoutes')
const {routerBlog} = require('./routes/blogRoutes');


//middleware require

const {requiredAuth} = require("./middlewares/tokenMiddleware")

const port = 8080;
connectionHelper.connect()

app.set('view engine', 'ejs'); // html dosyalarını ejs olarak değiştiriyoruz ve içinde javascript yazabiliyoruz

app.listen(port, () => {
    console.log("Server started working")
})

app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser())



app.get("/", (req,res)=>{
    res.redirect("/home")
})

app.use('/home',routerHome)   // router ile yolunu söyledim.
app.use('/author',routerAuth)   // author kaldırdım nedeni direk olarak login olarak ulaşmamız için
app.use('/blog',requiredAuth,upload.single('webuserimage'),routerBlog)  // blog kaldırdım direkt  getpage felan ulaşmamız için ama olmadı.
app.use((req, res) => {
    res.status(400).render('404')
})



