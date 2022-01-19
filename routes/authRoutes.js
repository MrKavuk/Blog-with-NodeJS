const express = require('express')
const routerAuth = express.Router()
const {controller} = require('../controllers/authController')
const {resetPasswordAuth} = require("../middlewares/tokenMiddleware")

routerAuth.get("/login", controller.getLogin)
routerAuth.get("/signUp", controller.getSignUp)
routerAuth.get('/resetPassword',controller.getResetPassword)

//reset token change password get koyuldu.
routerAuth.get('/changePassword/:id/:token',resetPasswordAuth,controller.getChangePassword)
routerAuth.post('/changePassword/',controller.changePassword)
//onay maili router
routerAuth.get("/verify/:uniqueString", controller.verify)
routerAuth.post('/signUp/', controller.postSignUp )
routerAuth.post('/login',controller.postLogin)

routerAuth.post("/resetPassword", controller.postResetPassword)

routerAuth.get("/logout", controller.logout);
module.exports ={
    routerAuth
}
