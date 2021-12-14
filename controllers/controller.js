const {webUserModel} = require('../models/webUser')
const {connectionHelper} = require('../dbconnect/connectionHelper')
const CryptoJS = require("crypto-js");
const {shaKey} = require('../env/saveKeySha')
const controller ={

    getHomepage : (req,res)=>{
        res.render('homePage',{title:"Welcome Home Page"})
    },
    getLogin : (req,res)=>{
        res.render('login',{title:"Login"})
    },
    getSignUp : (req,res)=>{
        res.render('signup',{title:"Sign Up"})
    },
    getResetPassword : (req,res)=>{
        res.render('reset',{title:"Reset Password"})
    },
    getError : (req,res)=>{
        res.render('404')
    },
    setSignUp : (req,res)=>{

        connectionHelper.connect()
        webUserModel.findOne({email : req.body.email},(err,doc)=>{
            if(!doc){
                encrypePassword = CryptoJS.SHA256(req.body.password,shaKey)

                webUser = new webUserModel({
                    name : req.body.name,
                    surname : req.body.surname,
                    email : req.body.email,
                    username : req.body.username,
                    password : encrypePassword   
                })
                webUser.save((err,doc)=>{
                    if(!err && doc != null){
                        res.status(201).json(doc)
                        console.log("Kayit basarili")
                    }
                    else{
                        res.status(400).json({
                            msg : "Kayıt Başarısız"
                        })
                    }
                })
            }
            else{
                res.status(400).json({msg : "Eposta zaten kayıtlı"})
            }
        })
        
    },
    login : (req,res)=>{

        password = req.body.password
        console.log('email : '+ email)
        console.log('password : '+password)
        
        webUserModel.findOne({email : req.body.email},(err,doc)=>{
            console.log(doc)
            if(doc!=null && !err){
              var bytes = CryptoJS.AES.decrypt(doc.password,shaKey)
              var decryptePassword = bytes.toString(CryptoJS.enc.Utf8)
               if(password === decryptePassword){
                   res.status(201).json({msg : "Giriş Başarılı"})
               }
               else{
                   res.status(400).json({msg : " Şifre hatalı "})
               }
            }
            else{
                res.status(400).json({msg :"Eposta hatalı"})
            }

        })
    }
}
module.exports ={
    controller
}