const {webUserModel} = require('../models/webUser')
const {connectionHelper} = require('../dbconnect/connectionHelper')

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
            if(err){
                webUser = new webUserModel({
                    name : req.body.name,
                    surname : req.body.surname,
                    email : req.body.email,
                    username : req.body.username,
                    password : req.body.password     // Şifreleme ile kaydetcez
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
        
    }
}
module.exports ={
    controller
}