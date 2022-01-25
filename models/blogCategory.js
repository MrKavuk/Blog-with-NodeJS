const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogCategorySchema = new Schema({

    name : { type : String, require : true,unique:true}

})

const blogCategoryModel = mongoose.model('BlogCategory',blogCategorySchema)

module.exports = {
    blogCategoryModel
}
