const User = require("../models/author");
const {tokenKey} = require('../env/tokenKey')
const jwt = require("jsonwebtoken");
const {authorModel} = require('../models/author')

const requiredAuth = (req,res,next)=>{
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, tokenKey, (error, decodedToken)=>{
            if(error){
                console.log(error);
                res.redirect("/author/login");
            }

            else{
                
                req.author_id = decodedToken.data
                next();
            }

        })
    }

    else{
        res.redirect("/author/login");
    }
}
const checkUser = (req,res,next)=>{
    const token =req.cookies.jwt
    console.log("CheckUser token : ",token)
    if(token){
        console.log("CheckUser If icinde (token var)")
        jwt.verify(token, tokenKey, async (error, decodedToken)=>{
            if(error){
                console.log("Token var ama gecerli değil req.locals.user null atandı")
                res.locals.user =null
                next();
            }

            else{
                res.locals.user = await authorModel.findById(decodedToken.data)
                console.log("CheckUser data : ",res.locals.user)
                next();
            }

        })
    }

    else{
        console.log("token yok req.locals.user null atandı")
        res.locals.user = null
        console.log("req.locals.user = ",res.locals.user)
        next()
    }
}

module.exports = {
    requiredAuth,
    checkUser 
}