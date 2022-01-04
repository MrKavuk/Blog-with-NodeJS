const { authorModel } = require('../models/author')
const CryptoJS = require("crypto-js");
const { userLoginKey } = require('../env/saveKeySha')
const {tokenKey} = require('../env/tokenKey');
const jwt = require("jsonwebtoken");  //json web token modulu dahil edildi.
const uuid = require("uuid")
const nodemailer = require("nodemailer");  //mail modulu dahil edildi.
const { response } = require('express');

const maxAge = 60*60*24   // max süresini dışarıdan belirlendi.




const createToken = (id) =>{
    
    return jwt.sign({ data: id, iat:maxAge}, tokenKey);
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
       // console.log(req.body)
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
                        res.redirect('/author/login')
                        console.log("Kayit basarili")
                    }
                    else {
                        res.status(400).json({
                            msg: err
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
                        res.redirect("/");      // anasayfa bizi gönder
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
    },

    logout: (req,res)=>{
        res.cookie("jwt", "", {maxAge:1});
        res.redirect("/author/login");
    },

    postResetPassword: async (req,res)=>{

              
        var transport = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: 'eposta',
                pass: 'sifre'
            }
        })


        email = req.body.email

        doc = await authorModel.findOne({email: req.body.email})

        if(doc != null){
            
            var textReset = uuid.v1()
            var mailOptions = {
                from: 'eposta',
                to: req.body.email,
                subject: 'Şifre Değiştirme',
                text: `Şifrenizi değiştirmek için tıklayın : http://localhost:8080/author/changePassword/${textReset}`
               
            }

          
            transport.sendMail(mailOptions,(err,data)=>{
                if(!err){
                    console.log("Kayıt Başarılı")
                }

                else{
                    console.log("Mail Gönderilemedi");
                }
            })
            await authorModel.updateOne({email : doc.email},{reset : textReset})
            
            res.redirect('/author/login')
        }

                
    
    
        else{
            res.status(500).json({msg:"Girilen Eposta Bulunamadı"})
        }
            
                

    },
    getChangePassword : (req,res)=>{
       
        authorModel.findOne({reset : req.params.id},(err,doc)=>{
            
            if(doc){
                
                res.render('resetPassword',{email : doc.email,title :"Change"})
                
            }
            else{
                res.json({msg : "reset istegi bulunamadi"})
            }
        })
    }
    ,
    changePassword : async (req,res)=>{
        var encryptPassword = CryptoJS.AES.encrypt(req.body.password, userLoginKey).toString();
        await authorModel.updateOne({email : req.body.email},{password : encryptPassword,reset : null})
        res.redirect('/')
    }


    
}

module.exports={
    controller
}