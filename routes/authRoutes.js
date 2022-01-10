const express = require('express')
const routerAuth = express.Router()
const {controller} = require('../controllers/authController')
const {resetPasswordAuth} = require("../middlewares/tokenMiddleware")

const {signUpValidation,signUpValidate} = require("../middlewares/signUpValidationMiddleware");

const {logInValidation,logInValidate} = require("../middlewares/logInValidationMiddleware")

const {changePasswordValidation,changePasswordValidate} = require("../middlewares/resetPasswordValidationMiddleware")

routerAuth.get("/login", controller.getLogin)
routerAuth.get("/signUp", controller.getSignUp)
routerAuth.get('/resetPassword',controller.getResetPassword)

//reset token change password get koyuldu.
routerAuth.get('/changePassword/:id/:token',resetPasswordAuth,controller.getChangePassword)
routerAuth.post('/changePassword',changePasswordValidation(),changePasswordValidate,controller.changePassword)
//onay maili router
routerAuth.get("/verify/:uniqueString", controller.verify)
routerAuth.post('/signUp/',signUpValidation(),signUpValidate,controller.postSignUp )
routerAuth.post('/login',logInValidation(),logInValidate,controller.postLogin)

routerAuth.post("/resetPassword",controller.postResetPassword)

routerAuth.get("/logout", controller.logout);
module.exports ={
    routerAuth
}
