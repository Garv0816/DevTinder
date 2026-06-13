const mongoose = require("mongoose")

const connectionRequest = new mongoose.Schema({
    fromUserID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
       
    },
     toUserID : {
        type : mongoose.Schema.Types.ObjectId
    
    } ,
    status:{
        type: String,
        enum: ["Intrested", "Rejected", "Ignored","Accepted"],
        message: "{VALUE} is not allowed"
    }   
},
{timestamps : true})

const ConnectionRequestModel =  new mongoose.model("ConnectionRequestModel" , connectionRequest)

module.exports = ConnectionRequestModel