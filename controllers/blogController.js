const {blogModel} =  require('../models/blogs')
const {commentModel} = require('../models/comment')
const {controlCommentModel} = require('../models/controlComment')
const{authorModel} = require('../models/author')
const uuid = require('uuid')
const path = require('path')
const moment = require('moment'); //moment modulu eklendi
const { convert } = require('html-to-text');
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
        blogModel.findById(req.params.id).populate('author comments').then((data)=>{
            
            res.status(200).render('blogPostPage', {title: data.title, blog:data})
        }).catch((err)=>{
            console.log(err);
            res.render('404')
        })
    },
    getMyblogs :(req,res)=>{
        blogModel.find({author :req.params.id}).populate('author comments').then((data)=>{
            res.render('myBlogs',{blogs : data,title : "MyBlogs"})
        }).catch((err)=>{
            console.log(err);
            res.render('404')
        })
    },
    postBlog : (req,res)=>{
        long= req.body.long
        console.log(req.file)
        if(!req.file){
            return  res.redirect("/blog/getPage")
        }
        const blog = new blogModel({
            title : req.body.title,
            long :  long,
            short : long.substring(0,(req.body.long.length/4))+"...",
            imgName : req.file.filename,
            category: req.body.category,
            author : [req.author_id],
            createdAt: moment().locale("tr").format("LLL")
        })
        blog.save().then((result)=>{
            res.redirect('/')
        })
        .catch((err)=>{
            res.status(400).send("Blog Keydedilemedi")
        })
    },
    updateBlog :(req,res) =>{
        var short = req.body.long.substring(0,(req.body.long.length/4)) + " ..."
        blogModel.updateOne({_id :req.params.id},{long : req.body.long, title : req.body.title, short: short, category:req.body.category }).then((data)=>{
            res.redirect('/')
        })
    },
    getComment : (req,res)=>{
        controlCommentModel.find((err,comments)=>{
            if(!err){
                res.render('commentPage',{comments : comments, title : "Comments"})
            }
            else{
                res.status(400).render('404',{title : "Error"})
            }
            
        })
    },
    addControlComment : async(req,res) =>{
        author = await authorModel.findById(req.body.authorId)
        comment = new controlCommentModel({
            author : author.name,
            blogId : req.body.blogId,
            comment : req.body.comment

        })
        comment.save().then((result)=>{
            console.log(" Comment Add Admin Panel: " ,result)    
            res.redirect(`/blog/get/${req.body.blogId}`)
 
        })
    }
    ,

    deleteComment: async (req,res)=>{
        await controlCommentModel.deleteOne({_id : req.body.controlId})
        res.redirect('/blog/getComments')
    } 
    ,
    addComment : async(req,res) =>{
        console.log(" silinecek control id : "+req.body.controlId)
        await controlCommentModel.deleteOne({_id : req.body.controlId})
        comment = new commentModel({
            author : req.body.author,
            blogId : req.body.blogId,
            comment : req.body.comment

        })
        comment.save().then((result)=>{
            console.log(" Comment : " ,result)
            blogModel.findOne({_id : req.body.blogId}).exec((err,blog)=>{
                if(blog){
                    blog.comments.push(result._id)
                    blog.commentSize = blog.commentSize+1
                    blog.save()

                }
               res.redirect(`/blog/get/${req.body.blogId}`)
            })
            
            
        })
    }
    ,
    deleteBlog : (req,res) =>{
        blogModel.deleteOne({_id : req.params.id}).then((data)=>{
            if(data){
                console.log("Data Silindi")
                console.log(data)
                res.redirect('/')
            }
            else{
                res.json({msg : "Veri Silinemedi"})
            }
            
        })
    }
}

module.exports ={ controller }