const { body, check,validationResult } = require('express-validator')
var bodyParser = require('body-parser')
const { authorModel } = require('../models/author')
// parse application/x-www-form-urlencoded
bodyParser.urlencoded({ extended: false })


const changePasswordValidation = ()=>{

    return [
        body("password").isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("Password: Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one symbols and one number"),
    ]

}


const changePasswordValidate = (req, res, next) => {
    const errors = validationResult(req)

        if (!errors.isEmpty()) {
        
            const alert = errors.array();
            res.render("resetPassword",{
                title: "Change",
                email: req.body.email,
                alert
            })
            console.log("alert")
        }
    
        else{
            console.log(req.body)
            return next()
        }
    




  }


  module.exports ={
    changePasswordValidation,
    changePasswordValidate
  }