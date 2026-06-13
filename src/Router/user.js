const express = require("express")
const User = require("../models/user");
const ConnectionRequestModel = require("../models/Request");
const userAuth = require("../userAuth/userAuth");
const { connections } = require("mongoose");
const RequestRouter = express.Router()

// This API return all the pending request to the logged in user 

RequestRouter.get("/requests/received/pending",userAuth, async (req ,res)=>{
try{
    
    const loggedInUser = req.UserID;
    console.log("userID==>" + loggedInUser)
    const pendingRequest = await ConnectionRequestModel.find({
        userID : loggedInUser,
        status : "Intrested"
    }).populate("fromUserID" , ["firstName" , "lastName"])
 return res.send(pendingRequest)
    
}
catch(err){
    console.log("err===>>" + err)
    return res.json({message : "Error while finding request"})
}

})

//This API return the User Which are eccepted and there Details
// PENDING ...... NOT COMPLETED ....
RequestRouter.get("/requests/connections" ,userAuth , async(req ,res)=>{
    const loggedInUser = req.UserID;
    const connections = await ConnectionRequestModel.find({
        $or:[
            {fromUserID : loggedInUser , status : "Accepted"},  
            {toUserID : loggedInUser , status : "Accepted"}
            ]
    }).populate("fromUserID", ["firstName lastName"] )
   return res.json({data : connections})
})

module.exports = RequestRouter


