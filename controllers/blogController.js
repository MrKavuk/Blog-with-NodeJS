const {blogModel} =  require('../models/blogs')

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
            short : req.body.long.substring(0,(req.body.long.length/10))+"...",
            // img: {
            //     data: fs.readFileSync(path.join(__dirname + '/img/3.jpg')),
            //     contentType: 'image/png'
            // }
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