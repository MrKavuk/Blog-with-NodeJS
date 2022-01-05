const mongoose = require('mongoose');
const {Schema} = mongoose;


const controlCommentSchema = new Schema({

    author:{type : String },
    comment: {type : String, required: true},
    blogId:{type : Schema.Types.ObjectId , ref :'Blog'},
    
})

const controlCommentModel = mongoose.model("ControlComment", controlCommentSchema)

module.exports={
    
    controlCommentModel
}