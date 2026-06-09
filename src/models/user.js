
const mongoose = require("mongoose")
const validator = require("validator")
const JWT =  require("jsonwebtoken")

const userScehema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength :3,
        maxlength : 50
    }   
    ,
      lastName : {
        type : String
    },
      email : {
        type : String,
        required: true,
        unique : true,
        trim : true,
        lowercase : true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Invaid Email")
          }
        }
    },
     skills : {
      type : [String],
      required:true

    }
    ,
      password : {
        type : String,
        required : true
    },
      gender : {
        type : String,
        validate : {
          validator(value){
            if(!["male", "female","other"].includes(value)){
              throw new Error("Invalid ")
            }
          }
        }
        
    ,
     age : {
        type : Number,
        min :18
    },
    PhotoURL : {
      type : String,
      default : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"

    }
  }
}
,
{
  timestamps : true
}
 )
 
    userScehema.methods.getJWT = async function(){
    const user = this
    const JWTtoken = JWT.sign({ _id: this._id }, "GarvKingMaster");
           
}

const User = mongoose.model("User" , userScehema)

module.exports = User