const { blogModel } = require('../models/blogs')
const { commentModel } = require('../models/comment')
const { controlCommentModel } = require('../models/controlComment')
const { authorModel } = require('../models/author')
const { blogCategoryModel } = require('../models/blogCategory')
const { blogImageModel } = require('../models/blogImages')
const uuid = require('uuid')
const path = require('path')
const moment = require('moment'); //moment modulu eklendi
const { convert } = require('html-to-text');
const fs = require('fs')
const controller = {
    getBlogPage: async (req, res) => {
        categories = await blogCategoryModel.find().catch(err => {
            console.log(err)
        })
        console.log("categories : ", categories)
        res.render('addBlog', { title: "Add Blog", categories: categories, titleSub: "Add Blog", data: null })

    },
    getUpdateBlogPage: async (req, res) => {
        categories = await blogCategoryModel.find().catch(err => {
            console.log(err)
        })
        blogModel.findById(req.params.id).then((blog) => {
            console.log("data : ", blog)
            res.render('addBlog', { title: "Update Blog", titleSub: "Update Blog", categories: categories, data: blog })
        }).catch((err) => {
            console.log(err);
            res.render('404')
        })


    },
    getBlog: (req, res) => {
        blogModel.findById(req.params.id).populate('author comments category imgId').then((data) => {

            res.status(200).render('blogPostPage', { title: data.title, blog: data })
        }).catch((err) => {
            console.log(err);
            res.render('404')
        })
    },
    getMyblogs: (req, res) => {
        blogModel.find({ author: req.params.id }).populate('author comments').then((data) => {
            res.render('myBlogs', { blogs: data, title: "MyBlogs" })
        }).catch((err) => {
            console.log(err);
            res.render('404')
        })
    },
    postBlog: async (req, res) => {
        long = req.body.long
        const text = convert(long, {
            wordwrap: 130
        });

        if (!req.file) {

            return res.redirect("/blog/getPage")
        }
        var category = await blogCategoryModel.findOne({ name: req.body.category })

        console.log('body:', req.body)
        var image = await new blogImageModel({
            imgName: req.file.filename,
            imgPath: req.file.path,
        })
        await image.save().catch((err) => {
            res.send('img eklenemedi' + err)
        })
        const blog = new blogModel({
            title: req.body.title,
            long: long,
            short: text.substring(0, (req.body.long.length / 4)) + "...",
            imgId: image._id,
            category: category._id,
            author: [req.author_id],
            createdAt: moment().locale("en").format("lll")
        })
        blog.save().then((result) => {
            res.redirect('/')
        })
            .catch((err) => {
                res.status(400).send("Blog Keydedilemedi")
            })

    },

    deleteCategory: (req, res) => {
        console.log("id : ", req.params.id)
        blogCategoryModel.deleteOne({ _id: req.params.id }, (err, delResult) => {
            if (delResult) {
                console.log("Silinen Veri: ", delResult);
                res.json({ status: true, message: "The data was deleted successfully." });
            }

            else {
                console.log("Error: ", err);
                res.json({ status: false, message: "Failed to delete data successfully." });
            }
        });

    },
    postCategory: (req, res) => {
        categoryLength = req.body.blogCategory.length;
        categoryReq = req.body.blogCategory[0].toUpperCase() + req.body.blogCategory.slice(1, categoryLength).toLowerCase()
        blogCategoryModel.findOne({ name: categoryReq }, (err, result) => {

            if (!result) {

                var categoryAdd = new blogCategoryModel({
                    name: categoryReq
                })

                categoryAdd.save((err, result) => {
                    blogCategoryModel.find().then((categories) => {
                        if (err) {
                            console.log("Kaydedilmedi, Error: ", err);
                            res.render("category", { title: "Category Add", categories: categories, titleSub: "Category Add", error: "A problem occurred while saving. Please try again." });
                        }

                        else {

                            console.log("Kaydedildi, data", result);
                            res.render("category", { title: "Category Add", categories: categories, titleSub: "Category Add", error: "Registration was successful." });

                        }
                    })

                })
            }
            else {
                blogCategoryModel.find().then((categories) => {
                    if (err) {
                        console.log("Kaydedilmedi, Error: ", err);
                        res.render("category", { title: "Category Add", categories: categories, titleSub: "Category Add", error: "A problem occurred while saving. Please try again." });
                    }

                    else {

                        console.log("Kaydedildi, data", result);
                        res.render("category", { title: "Category Add", categories: categories, titleSub: "Category Add", error: "It has not been added because such a category exists." });

                    }
                })

            }
        })
    },

    getCategory: (req, res) => {
        blogCategoryModel.find((err, result) => {

            if (result) {

                res.render("category", { title: "Category Add", titleSub: "Category Add", categories: result });
            }

            else {
                console.log("Error: ", err);
                res.render("category", { title: "Category Add", titleSub: "Category Add", error: "You have no categories." });
            }

        })
    },
    updateCategory: (req, res) => {
        categoryLength = req.body.categoryName.length;
        categoryReq = req.body.categoryName[0].toUpperCase() + req.body.categoryName.slice(1, categoryLength).toLowerCase()
        blogCategoryModel.find({ name: categoryReq }).then((category) => {
            console.log('category : ', category)
            if (category.length == 0) {
                blogCategoryModel.updateOne({ _id: req.body.categoryId }, { name: req.body.categoryName }, (err, updateResult) => {
                    if (updateResult) {
                        console.log("req body name: ", req.body.categoryName);
                        res.json({ status: true, message: "The data was update successfully." });
                    }

                    else {
                        console.log("Error: ", err);
                        res.json({ status: false, message: "Zaten Aynı veri var" });
                    }
                })
            }
            else {
                res.json({ status: false, message: "Failed to update data successfully." });
            }
        })



    }
    ,
    updateBlog: async (req, res) => {
        var category = await blogCategoryModel.findOne({ name: req.body.category }).catch((err) => {
            console.log('updateBlog : ', err)
        })
        var short = req.body.long.substring(0, (req.body.long.length / 4)) + " ..."
        blogModel.updateOne({ _id: req.params.id }, { long: req.body.long, title: req.body.title, short: short, category: category._id }).then((data) => {
            res.redirect('/')
        })
    },
    getComment: (req, res) => {
        controlCommentModel.find().populate('blogId').then((comments) => {
            if (comments.length > 0) {
                res.render('commentPage', { comments: comments, title: "Comments", ifComment: true })
            }
            else {
                res.render('commentPage', { comments: comments, title: "Comments", ifComment: false })
            }

        })
    },
    addControlComment: async (req, res) => {
        author = await authorModel.findById(req.body.authorId)
        comment = new controlCommentModel({
            author: author.name,
            blogId: req.body.blogId,
            comment: req.body.comment

        })
        comment.save().then((result) => {
            console.log(" Comment Add Admin Panel: ", result)
            res.redirect(`/blog/get/${req.body.blogId}`)

        })
    }
    ,

    deleteComment: async (req, res) => {
        await controlCommentModel.deleteOne({ _id: req.body.controlId })
        res.redirect('/blog/getComments')
    }
    ,
    addComment: async (req, res) => {
        console.log(" silinecek control id : " + req.body.controlId)
        await controlCommentModel.deleteOne({ _id: req.body.controlId })
        comment = new commentModel({
            author: req.body.author,
            blogId: req.body.blogId,
            comment: req.body.comment

        })
        comment.save().then((result) => {
            console.log(" Comment : ", result)
            blogModel.findOne({ _id: req.body.blogId }).exec((err, blog) => {
                if (blog) {
                    blog.comments.push(result._id)
                    blog.commentSize = blog.commentSize + 1
                    blog.save()

                }
                res.redirect(`/blog/get/${req.body.blogId}`)
            })


        })
    }
    ,
    deleteBlog: (req, res) => {
        blogModel.findOneAndRemove({ _id: req.params.id }).populate('imgId').then((data) => {
            if (data) {
                console.log(" Silinen data : ", data)
                fs.unlink(data.imgId.imgPath, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                });
                console.log("Data Silindi")
                blogImageModel.deleteOne({ _id: data.imgId._id }).catch((err) => {
                    console.log("blogImageModel delete error : ", err)
                })
                res.json({ status: true, redirect: "/" })
            }
            else {
                res.json({ status: false })
            }

        })
    }
}

module.exports = { controller }