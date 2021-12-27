const {blogModel} =  require('../models/blogs')
const uuid = require('uuid')
const path = require('path')
const controller = {
    getBlogPage : (req,res)=>{
            
            res.render('addBlog',{title : "Add Blog",data : null})
        
    },
    getUpdateBlogPage : (req,res)=>{
        blogModel.findById(req.params.id).then((blog)=>{
            console.log("data : ",blog)
            res.render('addBlog',{title : "Update Blog",data : blog })
        }).catch((err)=>{
            console.log(err);
            res.render('404')
        })
        
    
    },
    getBlog :(req,res)=>{
        blogModel.findById(req.params.id).then((data)=>{
            res.json(data)
        }).catch((err)=>{
            console.log(err);
            res.render('404')
        })
    },
    getMyblogs :(req,res)=>{
        blogModel.find({author :req.params.id}).then((data)=>{
            res.render('myBlogs',{blogs : data,title : "MyBlogs"})
        }).catch((err)=>{
            console.log(err);
            res.render('404')
        })
    },
    postBlog : (req,res)=>{
        
        const blog = new blogModel({
            title : req.body.title,
            long :  req.body.long,
            short : req.body.long.substring(0,(req.body.long.length/4))+"...",
            imgName : req.file.filename,
            author : [req.author_id]
        })
        blog.save().then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.status(400).send("Blog Keydedilemedi")
        })
    },
    updateBlog :(req,res) =>{
        var short = req.body.long.substring(0,(req.body.long.length/4))
        blogModel.updateOne({_id :req.params.id},{long : req.body.long, title : req.body.title, short: short }).then((data)=>{
            res.redirect('/')
        })
    }

}

module.exports ={ controller }