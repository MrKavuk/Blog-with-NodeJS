const mongoose = require('mongoose');
const {Schema} = mongoose;


const commentSchema = new Schema({

    author:{type : String },
    comment: {type : String, required: true},
    blogId:{type : Schema.Types.ObjectId , ref :'Blog'},
    
})

const commentModel = mongoose.model("Comment", commentSchema)

module.exports={
    
    commentModel
}