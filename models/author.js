const mongoose = require('mongoose');
const {Schema} = mongoose;


const authorSchema = new Schema({

    name: {type : String, required: true},
    surname: {type : String, required: true},
    email: {type : String, required: true, unique:true},
    username: {type : String, required: true, unique:true},
    password: {type : String, required: true},
    reset: {type : String}
    
})

const authorModel = mongoose.model("Author", authorSchema)

module.exports={
    
    authorModel
}