const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type:String,
        require :true
    },
    short:{
        type:String,
        require:true
    },
    long:{
        type:String,
        require:true
    },
    author:[{type : Schema.Types.ObjectId , ref :'Author'}]

},{timestamps: true})

const blogModel = mongoose.model('Blog',blogSchema);

module.exports = {
    blogModel
}