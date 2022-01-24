const { body, check,validationResult } = require('express-validator')
var bodyParser = require('body-parser')
const fs = require('fs')
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
        fs.unlink(req.file.path,function(err){
          if(err) return console.log(err);
          console.log('file deleted successfully');
      }); 
        const alert = errors.array();
        res.render("addBlog",{
            title: "Add Blog",
            data : null,
            titleSub:"Add Blog",
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