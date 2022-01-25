const express = require('express')
const routerBlog = express.Router()
const {controller} = require('../controllers/blogController')
//middleware require

const {requiredAdmin,requiredDelete,requiredAuth} = require("../middleware/token")

const {blogValidationRules,blogValidate,commentValidate} = require("../middleware/blogValidation")



routerBlog.get("/getPage",requiredAuth,controller.getBlogPage)
routerBlog.get("/getUpdateBlogPage/:id",requiredAuth,controller.getUpdateBlogPage)
routerBlog.get("/get/:id",controller.getBlog)
routerBlog.get("/myBlogs/:id",controller.getMyblogs)
routerBlog.get('/getComments',requiredAdmin,controller.getComment)
routerBlog.get("/getCategoryPage", requiredAuth, controller.getCategory)

routerBlog.delete('/deleteCategory/:id',requiredAdmin,controller.deleteCategory)
routerBlog.delete('/deleteBlog/:id',requiredDelete,controller.deleteBlog)

routerBlog.put('/updateCategory',requiredAdmin,controller.updateCategory)

routerBlog.post('/categoryAdd', requiredAdmin, controller.postCategory)
routerBlog.post('/add',blogValidationRules(),blogValidate,requiredAuth,controller.postBlog)
routerBlog.post('/update/:id',requiredAuth,controller.updateBlog)
//routerBlog.post('/delete',requiredDelete,controller.deleteBlog)
routerBlog.post('/commentControl',requiredAuth,commentValidate,controller.addControlComment)
routerBlog.post('/comment',requiredAdmin,controller.addComment)
routerBlog.post('/deleteComment',requiredAdmin,controller.deleteComment)
module.exports ={
    routerBlog
}
