const mongoose = require('mongoose');
const {Schema} = mongoose;


const adminSchema = new Schema({

    name: {type : String, required: true},
    surname: {type : String, required: true},
    email: {type : String, required: true},
    username: {type : String, required: true},
    position: {type : String, required: true},
    password: {type : String, required: true}
    
})

const adminModel = mongoose.model("Admin", adminSchema)

module.exports={
    
    adminModel
}