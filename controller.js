const controller ={

    getHomepage : (req,res)=>{
        res.render('homePage',{title:"Welcome Home Page"})
    },
    getLogin : (req,res)=>{
        res.render('login',{title:"Login"})
    },
    getSignUp : (req,res)=>{
        res.render('signup',{title:"Sign Up"})
    },
    getResetPassword : (req,res)=>{
        res.render('reset',{title:"Reset Password"})
    },
    getError : (req,res)=>{
        res.render('404')
    }

}
module.exports ={
    controller
}