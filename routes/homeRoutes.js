const express = require('express')
const routerHome = express.Router()
const {controller} = require('../controllers/homeController')

routerHome.get('/',controller.getHomepage)


module.exports ={
    routerHome
}