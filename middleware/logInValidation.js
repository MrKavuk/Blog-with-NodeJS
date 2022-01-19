const { body, check,validationResult } = require('express-validator')
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
bodyParser.urlencoded({ extended: false })


const logInValidation = ()=>{

    return [
        body("password").notEmpty()
        .withMessage("Password: Please enter your password!"),

        body("email").isEmail().withMessage("Email: Please enter your e-mail address!")

    ]

}


const logInValidate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        
        const alert = errors.array();
        res.render("login",{
            title: "Log In",
            alert
        })
    }

    else{
        console.log(req.body)
        return next()
    }

  }


  module.exports ={
    logInValidation,
    logInValidate
  }