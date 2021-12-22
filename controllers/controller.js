const { webUserModel } = require('../models/webUser')
const {blogModel} =  require('../models/blogs')
const CryptoJS = require("crypto-js");
const { userLoginKey } = require('../env/saveKeySha')
const controller = {

    getHomepage: (req, res) => {
        blogModel.find()
            .then((result)=>{
                res.render('homePage', { title: "Welcome Home Page",blogs : result })
                })
            .catch((err)=>{
                console.log(err)
            })
        
    },
    getLogin: (req, res) => {
        res.render('login', { title: "Login" })
    },
    getSignUp: (req, res) => {
        res.render('signup', { title: "Sign Up" })
    },
    getResetPassword: (req, res) => {
        res.render('reset', { title: "Reset Password" })
    },
    getError: (req, res) => {
        res.render('404')
    },
    setSignUp: (req, res) => {

        
        webUserModel.findOne({ email: req.body.email }, (err, doc) => {
            if (!doc) {
                var encryptPassword = CryptoJS.AES.encrypt(req.body.password, userLoginKey).toString();

                webUser = new webUserModel({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    username: req.body.username,
                    password: encryptPassword
                })
                webUser.save((err, doc) => {
                    if (!err && doc != null) {
                        res.status(201).json(doc)
                        console.log("Kayit basarili")
                    }
                    else {
                        res.status(400).json({
                            msg: "Kayıt Başarısız"
                        })
                    }
                })
            }
            else {
                res.status(400).json({ msg: "Eposta zaten kayıtlı" })
            }
        })

    },
    login: (req, res) => {
        email = req.body.email
        password = req.body.password
        
        webUserModel.findOne({email : email},(err , doc)=>{

            if(!err && doc !=null){
                var bytes = CryptoJS.AES.decrypt(doc.password, userLoginKey);
                var decryptedData = bytes.toString(CryptoJS.enc.Utf8)

                if(decryptedData === password ){
                    res.status(200).json({msg : "Giriş Başarılı"})
                }
                else{
                    
                    res.status(400).json({msg : "Şifre Hatalı"})
                }
            }
            else{
                res.status(400).json({msg : "Eposta Hatalı"})
            }

        })
    },
    addBlog : (req,res)=>{
        const blog = new blogModel({
            title : req.body.title,
            short : req.body.short ,
            long :  req.body.long
        })
        blog.save().then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.status(400).send("Blog Keydedilemedi")
        })
    }

}
module.exports = {
    controller
}