const mongoose = require('mongoose')

const {connectString} = require('../env/config')

const connectionHelper={

    connect: () =>{

        mongoose.connect(connectString)

        .catch(error=>{

            console.log("Connection Error:", error);
        })


    }

}


module.exports = {

    connectionHelper 
}
