const {blogModel} =  require('../models/blogs')

const controller = {

    getHomepage: (req, res) => {
        blogModel.find().populate('author')
            .then((result)=>{
               
                res.render('homePage', { title: "Welcome Home Page",titleSub:"Home Page",blogs : result.reverse()})
                })
            .catch((err)=>{
                console.log(err)
            })
        
    }
    

}

module.exports = { controller }