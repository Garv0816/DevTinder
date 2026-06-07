const mongoose = require("mongoose")

const userScehema = mongoose.Schema({
    firstName : {
        type : String
    }
        
    ,
      lastName : {
        type : String
    },
      email : {
        type : String
    }
    ,
      password : {
        type : String
    },
      gender : {
        type : String
    },
     age : {
        type : Number
    }
}
)

const User = mongoose.model("User" , userScehema)
module.exports = User