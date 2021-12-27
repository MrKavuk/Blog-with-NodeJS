const {blogModel} =  require('../models/blogs')

const controller = {

    getHomepage: (req, res) => {
        blogModel.find()
            .then((result)=>{
                res.render('homePage', { title: "Welcome Home Page",blogs : result})
                })
            .catch((err)=>{
                console.log(err)
            })
        
    }
    

}

module.exports = { controller }