const { authorModel } = require('../models/author')
const CryptoJS = require("crypto-js");
const { userLoginKey } = require('../env/saveKeySha')
const {tokenKey} = require('../env/tokenKey');
const jwt = require("jsonwebtoken");  //json web token modulu dahil edildi.
const uuid = require("uuid")
const nodemailer = require("nodemailer");  //mail modulu dahil edildi.
const { response } = require('express');
const {testEmail,emailPassword} = require('../env/config')


const maxAge = 60*60*24   // max süresini dışarıdan belirlendi.

const maxTime =900


const createToken = (id) =>{
    
    return jwt.sign({ data: id, iat:maxAge}, tokenKey);
}

const ResetToken = (email) =>{

    return  jwt.sign({ email: email}, tokenKey, {expiresIn: maxTime});

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
       const isValid = false
       email= req.body.email
       username = req.body.username.toLowerCase()
       var uniqueString = uuid.v1()
        authorModel.findOne({$or:[{ email: req.body.email},{ username: username}]}, (err, doc) => {
            
            if (!doc) {
                var encryptPassword = CryptoJS.AES.encrypt(req.body.password, userLoginKey).toString();
                
                author = new authorModel({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    username: req.body.username.toLowerCase(),
                    password: encryptPassword,
                    position: "author",
                    isValid: isValid,
                    uniqueString: uniqueString
                    
                    
                })
               
                 
                    author.save((err, doc) => {
                        if (!err && doc != null) {
                            function sendMail (email, uniqueString){
                      
                                var transport1= nodemailer.createTransport({
                                    service: "gmail",
        
                                    auth: {
                                        user: testEmail,
                                        pass: emailPassword
                                    }
                                })
        
                                var mailOptions1 = {
                                    from: "eposta",
                                    to: email,
                                    subject: "Email confirmation",
                                    html: `Press <a href=http://localhost:8080/author/verify/${uniqueString}> here </a> to verify your email. Thanks`
                                }
        
                                transport1.sendMail(mailOptions1, function(error,response){
                                    if(error){
                                        console.log(error);
                                    }
                                    else{
                                        console.log("Message Sent")
                                    }
                                })
                            }
        
                            sendMail(email, uniqueString )
                            
                            console.log("Kayit basarili")
                            res.redirect('/author/login')
                            
                           
                        }
                        else {
                            console.log({
                                msg: err
                            })
                        }
                    })
               

             
            }
            else {
                if(doc.username === username){
                    res.render("signup",{title:"Sign Up", error:"The username is already registered."})
                }
                else{
                    res.render("login",{title:"Log In", error:"The e-mail is already registered."})
                }
                
                
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
                  
                    res.render('login', { title: "Login" , error: "mail or password is incorrect!"})
                }
            }
            else{
                res.render('login', { title: "Login" , error: "mail or password is incorrect!"})
            }

        })
    },

    logout: (req,res)=>{
        res.cookie("jwt", "", {maxAge:1});
        res.redirect("/author/login");
    },


    //Reset password link token
    postResetPassword: async (req,res)=>{

              
        var transport = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: testEmail,
                pass: emailPassword
            }
        })


        email = req.body.email

        doc = await authorModel.findOne({email: req.body.email})

        if(doc != null){
            
            var textReset = uuid.v1()
            var tokenLink=ResetToken(req.body.email)
            res.cookie("jwtLink", tokenLink, {httpOnly: true, maxTime: maxTime * 1000})
            var mailOptions = {
                from: 'eposta',
                to: req.body.email,
                subject: 'Şifre Değiştirme',
                text: `Şifrenizi değiştirmek için tıklayın (Not: Linkin geçerlilik süresi 15 dakikadır.): http://localhost:8080/author/changePassword/${textReset}`
               
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
            res.render("reset", {title: "Reset Password", error: "No such user found!"})
        }
            
                

    },

    //Reset password link Cookies de varsa yoksa kontrol
    getChangePassword : (req,res)=>{


        authorModel.findOne({reset : req.params.id},(err,doc)=>{
        if(req.cookies.jwtLink!=undefined || req.cookies.jwtLink !=null){

            if(doc){
                
                res.render('resetPassword',{email : doc.email,title :"Change"})
                
            }



        }
           
            else{
                res.cookie("resetToken", "", {maxTime: 1})
                res.redirect("/author/resetPassword")
                // res.json({msg : "yetki bulunamadi"})
            }
        })
        
        }

    

 
        
    ,
    changePassword : async (req,res)=>{
        var encryptPassword = CryptoJS.AES.encrypt(req.body.password, userLoginKey).toString();
        await authorModel.updateOne({email : req.body.email},{password : encryptPassword,reset : null})
        res.cookie("jwtLink", "", {maxTime: 1})
        res.redirect('/author/login')
    },



    verify: async (req,res)=>{
        uniqueString =req.params.uniqueString
        
        user =await authorModel.findOne({ uniqueString: uniqueString })

            if(user){

                if(user.isValid != "true"){
                    user.isValid = true;
                    user.save().catch((err)=>{
                        console.log('isValid hatası : ',err)
                    });
                    res.redirect('/')
                }


                else{
                    res.render("login",{title: "login", error:"This subscription has been confirmed."})
                    // res.json({msg: "Bu üyelik onaylanmıştır."})
                }
              
            }
            
            else{
                res.render("signup",{title: "Sign Up", error:"No such user was found."})
                // console.log("Böyle bir kullanıcı bulunamadı.")
            }
            
            
    }
    
    
    }


module.exports={
    controller
}