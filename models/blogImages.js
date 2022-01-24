const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogImageSchema = new Schema({

    imgName:{type:String},
    imgPath:{type:String}

})

const blogImageModel = mongoose.model('BlogImage',blogImageSchema)

module.exports = {
    blogImageModel
}