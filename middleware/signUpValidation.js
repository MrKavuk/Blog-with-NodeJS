const { body, check,validationResult } = require('express-validator')
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
bodyParser.urlencoded({ extended: false })


const signUpValidation = ()=>{

    return [
        body("password").isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("Password: Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbols and one number"),

        body("email").notEmpty().withMessage("Email: here cannot be left blank."),

        body("username").isLength({min: 4}).withMessage("Username: must be at least 4 chars long")
    ]

}


const signUpValidate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        
        const alert = errors.array();
        res.render("signup",{
            title: "Sign Up",
            alert
        })
    }

    else{
        console.log(req.body)
        return next()
    }

  }


  module.exports ={
    signUpValidation,
    signUpValidate
  }