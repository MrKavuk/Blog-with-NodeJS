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
        
        const alert = errors.array();
        res.render("addBlog",{
            title: "Add Blog",
            data : null,
            alert
        })
    }

    else{
        console.log(req.body)
        return next()
    }
  }


  module.exports={
    blogValidationRules,
    blogValidate
  }