const mongoose = require('mongoose');
const {Schema} = mongoose;


const commentSchema = new Schema({

    user: {type : String, ref :'Author'},
    comment: {type : String, required: true}
    
    
})

const commentModel = mongoose.model("Comment", commentSchema)

module.exports={
    
    commentModel
}