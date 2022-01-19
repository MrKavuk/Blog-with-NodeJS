const express = require('express')
const routerAuth = express.Router()
const {controller} = require('../controllers/authController')
const {resetPasswordAuth} = require("../middleware/token")

const {signUpValidation,signUpValidate} = require("../middleware/signUpValidation");

const {logInValidation,logInValidate} = require("../middleware/logInValidation")

const {changePasswordValidation,changePasswordValidate} = require("../middleware/resetPasswordValidation")

routerAuth.get("/login", controller.getLogin)
routerAuth.get("/signUp", controller.getSignUp)
routerAuth.get('/resetPassword',controller.getResetPassword)
routerAuth.get("/logout", controller.logout);
routerAuth.get('/changePassword/:id',resetPasswordAuth,controller.getChangePassword) 
routerAuth.get("/verify/:uniqueString", controller.verify)  //onay maili router


routerAuth.post('/signUp/',signUpValidation(),signUpValidate,controller.postSignUp )
routerAuth.post('/login',logInValidation(),logInValidate,controller.postLogin)
routerAuth.post("/resetPassword",controller.postResetPassword)
routerAuth.post('/changePassword',changePasswordValidation(),changePasswordValidate,controller.changePassword)
module.exports ={
    routerAuth
}
