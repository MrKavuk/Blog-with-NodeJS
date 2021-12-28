const express = require('express')
const routerBlog = express.Router()
const {controller} = require('../controllers/blogController')
//middleware require

const {requiredAuth} = require("../middlewares/tokenMiddleware")
routerBlog.get("/getPage",requiredAuth,controller.getBlogPage)
routerBlog.get("/getUpdateBlogPage/:id",requiredAuth,controller.getUpdateBlogPage)
routerBlog.get("/get/:id",controller.getBlog)
routerBlog.get("/myBlogs/:id",controller.getMyblogs)
routerBlog.get('/deleteBlog/:id',requiredAuth,controller.deleteBlog)

routerBlog.post('/add',requiredAuth,controller.postBlog)
routerBlog.post('/update/:id',requiredAuth,controller.updateBlog)
routerBlog.post('/delete',requiredAuth,controller.deleteBlog)

module.exports ={
    routerBlog
}
