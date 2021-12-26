const {blogModel} =  require('../models/blogs')
const uuid = require('uuid')
const path = require('path')
const controller = {
    getBlogPage : (req,res)=>{
        res.render('addBlog',{title : "Add Blog"})
    },

    getBlog :(req,res)=>{
        blogModel.findById(req.params.id).then((data)=>{
            res.json(data)
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
            imgName : req.file.filename
            
        })
        blog.save().then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.status(400).send("Blog Keydedilemedi")
        })
    },


}

module.exports ={ controller }