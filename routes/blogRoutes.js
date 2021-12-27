const express = require('express')
const routerBlog = express.Router()
const {controller} = require('../controllers/blogController')
//middleware require

const {requiredAuth} = require("../middlewares/tokenMiddleware")
routerBlog.get("/getPage",requiredAuth,controller.getBlogPage)
routerBlog.get("/getUpdateBlogPage/:id",requiredAuth,controller.getUpdateBlogPage)
routerBlog.get("/get/:id",controller.getBlog)
routerBlog.get("/myBlogs/:id",controller.getMyblogs)
routerBlog.post('/add',requiredAuth,controller.postBlog)
routerBlog.post('/update/:id',requiredAuth,controller.updateBlog)


module.exports ={
    routerBlog
}
