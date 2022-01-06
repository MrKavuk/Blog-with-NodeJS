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

    createdAt:{
        type:String,
    },

    category: { 
        type:String
    }
    ,
    author:{type : Schema.Types.ObjectId , ref :'Author'},
    comments:[{type : Schema.Types.ObjectId , ref :'Comment'}],
    commentSize :{type:Number, default:0 },
    imgName:{type:String}

})

const blogModel = mongoose.model('Blog',blogSchema);

module.exports = {
    blogModel
}