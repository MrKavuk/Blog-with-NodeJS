const express = require('express')
const routerBlog = express.Router()
const {controller} = require('../controllers/blogController')
//middleware require

const {requiredAdmin,requiredDelete,requiredAuth} = require("../middlewares/tokenMiddleware")

const {blogValidationRules,blogValidate} = require("../middlewares/blogValidationMiddleware")



routerBlog.get("/getPage",requiredAuth,controller.getBlogPage)
routerBlog.get("/getUpdateBlogPage/:id",requiredAuth,controller.getUpdateBlogPage)
routerBlog.get("/get/:id",controller.getBlog)
routerBlog.get("/myBlogs/:id",controller.getMyblogs)
routerBlog.get('/deleteBlog/:id',requiredDelete,controller.deleteBlog)
routerBlog.get('/getComments',requiredAdmin,controller.getComment)

routerBlog.post('/add',blogValidationRules(),blogValidate,requiredAuth,controller.postBlog)
routerBlog.post('/update/:id',requiredAuth,controller.updateBlog)
routerBlog.post('/delete',requiredDelete,controller.deleteBlog)
routerBlog.post('/commentControl',requiredAuth,controller.addControlComment)
routerBlog.post('/comment',requiredAdmin,controller.addComment)
routerBlog.post('/deleteComment',requiredAdmin,controller.deleteComment)
module.exports ={
    routerBlog
}
