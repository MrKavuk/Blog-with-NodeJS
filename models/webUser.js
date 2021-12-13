const mongoose = require('mongoose');
const {Schema} = mongoose;


const webUserSchema = new Schema({

    name: {type : String, required: true},
    surname: {type : String, required: true},
    email: {type : String, required: true},
    username: {type : String, required: true},
    password: {type : String, required: true},
    
})

const webUserModel = mongoose.model("WebUser", webUserSchema)

module.exports={
    
    webUserModel
}