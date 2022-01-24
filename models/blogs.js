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

    category:{type : Schema.Types.ObjectId , ref :'BlogCategory'},
    author:{type : Schema.Types.ObjectId , ref :'Author'},
    comments:[{type : Schema.Types.ObjectId , ref :'Comment'}],
    commentSize :{type:Number, default:0 },
    imgId:{type : Schema.Types.ObjectId , ref :'BlogImage'},
    

})

const blogModel = mongoose.model('Blog',blogSchema);

module.exports = {
    blogModel
}