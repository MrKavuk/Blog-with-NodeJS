const express = require('express')
const routerAuth = express.Router()
const {controller} = require('../controllers/authController')

routerAuth.get("/login", controller.getLogin)
routerAuth.get("/signUp", controller.getSignUp)
routerAuth.get('/resetPassword',controller.getResetPassword)

routerAuth.post('/signUp', controller.postSignUp )
routerAuth.post('/login',controller.postLogin)

routerAuth.post("/resetPassword", controller.postResetPassword)

routerAuth.get("/logout", controller.logout);
module.exports ={
    routerAuth
}
