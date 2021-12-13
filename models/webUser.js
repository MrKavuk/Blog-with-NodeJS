const mongoose = require('mongoose');
const {schema} = mongoose;


const webUserSchema = new schema({

    name: {type : String, required: true},
    surname: {type : String, required: true},
    eMail: {type : String, required: true},
    userName: {type : String, required: true},
    password1: {type : String, required: true},
    
})

const webUserModel = mongoose.model("WebUser", webUserSchema)

module.exports={
    
    webUserModel
}