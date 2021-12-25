const express = require('express')
const routerBlog = express.Router()
const {controller} = require('../controllers/blogController')

routerBlog.get("/getPage", controller.getBlogPage)
routerBlog.get("/get/:id", controller.getBlog)
routerBlog.post('/add', controller.postBlog)

module.exports ={
    routerBlog
}
