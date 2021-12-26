const User = require("../models/author");

const jwt = require("jsonwebtoken");


const requiredAuth = (req,res,next)=>{
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, "secretKey", (error, decodedToken)=>{
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






module.exports = {
    requiredAuth
}