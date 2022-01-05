const User = require("../models/author");
const {tokenKey} = require('../env/tokenKey')
const jwt = require("jsonwebtoken");
const {authorModel} = require('../models/author')
const {blogModel} = require('../models/blogs')
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
const requiredDelete = (req,res,next)=>{
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, tokenKey, (error, decodedToken)=>{
            if(error){
                console.log(error);
                res.redirect("/author/login");
            }

            else{
                blogModel.findById(req.params.id).exec((err,blog)=>{
                    
                    if(blog.author == decodedToken.data){
                        req.author_id = decodedToken.data
                        next();
                    }
                    else{
                        res.redirect("/")
                    }
                })
                
                
                
            }

        })
    }

    else{
        res.redirect("/author/login");
    }
}

const checkUser = (req,res,next)=>{
    const token =req.cookies.jwt
    
    if(token){
        
        jwt.verify(token, tokenKey, async (error, decodedToken)=>{
            if(error){
                
                res.locals.user =null
                next();
            }

            else{
                res.locals.user = await authorModel.findById(decodedToken.data)
                next();
            }

        })
    }

    else{
        
        res.locals.user = null
        next()
    }
}
const requiredAdmin = (req,res,next)=>{
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, tokenKey, async (error, decodedToken)=>{
            if(error){
                console.log(error);
                res.status(400).redirect("/author/login");
            }

            else{
                author = await authorModel.findById(decodedToken.data)
                if(author.position == "admin"){
                    req.author_id = decodedToken.data
                    next();
                }
                else{
                    res.redirect("/");
                }
                
            }

        })
    }

    else{
        res.redirect("/author/login");
    }
}

module.exports = {
    requiredAuth,
    checkUser,
    requiredAdmin,
    requiredDelete 
}