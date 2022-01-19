const { body, check,validationResult } = require('express-validator')
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
bodyParser.urlencoded({ extended: false })


const blogValidationRules = () => {

    return [
     
      body('title').notEmpty().withMessage("Title: Enter title!"),
      
      body('long').notEmpty().withMessage("Text part : You cannot leave the text part blank!"),

      
    ]
    
  }
  
  const blogValidate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log("Title : ",req.body.title)
        console.log("Long : ",req.body.long)
        const alert = errors.array();
        res.render("addBlog",{
            title: "Add Blog",
            data : null,
            alert
        })
    }

    else{
        if(req.author.isValid == "true"){
            return next()
        }
        else{
          res.redirect('/')
        }
    }
  }
  const commentValidate = (req,res,next)=>{
    if(req.author.isValid == "true"){
      return next()
    }
    else{
      res.redirect('/')
    }
  }

  module.exports={
    blogValidationRules,
    blogValidate,
    commentValidate
  }