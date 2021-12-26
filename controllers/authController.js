const { authorModel } = require('../models/author')
const CryptoJS = require("crypto-js");
const { userLoginKey } = require('../env/saveKeySha')
// const {secretKey} = require('../env/tokenKey');
const jwt = require("jsonwebtoken");  //json web token modulu dahil edildi.

const maxAge = 60*60*24   // max süresini dışarıdan belirlendi.

const createToken = (id) =>{
    
    return jwt.sign({ data: id, iat:maxAge}, 'secretKey');
}


const controller ={
    getLogin: (req, res) => {
        res.render('login', { title: "Login" })
    },
    getSignUp: (req, res) => {
        res.render('signup', { title: "Sign Up" })
    },
    getResetPassword: (req, res) => {
        res.render('reset', { title: "Reset Password" })
    },

    postSignUp: (req, res) => {
        console.log(req.body)
        authorModel.findOne({ email: req.body.email }, (err, doc) => {
            if (!doc) {
                var encryptPassword = CryptoJS.AES.encrypt(req.body.password, userLoginKey).toString();

                author = new authorModel({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    username: req.body.username,
                    password: encryptPassword
                })
                author.save((err, doc) => {
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
    postLogin:  (req, res) => {
        email = req.body.email
        password = req.body.password
        
        authorModel.findOne({email : email},(err , doc)=>{

            if(!err && doc !=null){
                var bytes = CryptoJS.AES.decrypt(doc.password, userLoginKey);
                var decryptedData = bytes.toString(CryptoJS.enc.Utf8)
                
                if(decryptedData === password ){
                    
                    try{
                        const token = createToken(doc._id); // giren kullanıcı id göre jwt oluştur.
                        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000})  // tokenu cookie kaydettik.
                        res.redirect("/home");      // anasayfa bizi gönder
                        //res.status(200).json({msg : "Giriş Başarılı"})  // bu gelmeyecektir.
                    }

                    catch(error){
                        console.log(error);
                    }
                   
                }
                else{
                    
                    res.status(400).json({msg : "Şifre Hatalı"})
                }
            }
            else{
                res.status(400).json({msg : "Eposta Hatalı"})
            }

        })
    }
    
}

module.exports={
    controller
}