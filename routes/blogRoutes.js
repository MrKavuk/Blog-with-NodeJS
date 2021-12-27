const express = require('express')
const routerBlog = express.Router()
const {controller} = require('../controllers/blogController')
//middleware require

const {requiredAuth} = require("../middlewares/tokenMiddleware")
routerBlog.get("/getPage",requiredAuth,controller.getBlogPage)
routerBlog.get("/get/:id",controller.getBlog)
routerBlog.post('/add',requiredAuth,controller.postBlog)

module.exports ={
    routerBlog
}
