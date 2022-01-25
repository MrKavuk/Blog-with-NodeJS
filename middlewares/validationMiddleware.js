const { body, check,validationResult } = require('express-validator')
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
bodyParser.urlencoded({ extended: false })


const userValidationRules = () => {

    return [
     
      body('title').notEmpty().withMessage({"msg": "Başlık giriniz!"}),
      
      body('long').notEmpty().withMessage({"msg": "Yazı kısmını boş bırakamazsın!"}),

      
    ]
    
  }
  
  const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      console.log(req.body)
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }


  module.exports={
    userValidationRules,
    validate
  }