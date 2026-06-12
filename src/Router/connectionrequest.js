const express = require("express")
const userAuth = require("../userAuth/userAuth")
const ConnectionRouter = express.Router()
const ConnectionRequestModel =  require("../models/Request")
const User = require("../models/user")

//SENDING CONNECTION REQUEST CAN BE INTERESTED AND IGNORED
ConnectionRouter.post("/request/send/:status/:userID" , userAuth , async(req ,res)=>{

try{

const toUserID = req.params.userID;
const fromUserID = req.userID 
const status = req.params.status

const AllowedStatus = ["Intrested","Ignored"]
const StatusValue = AllowedStatus.includes(status)
//validations - 
// checking status can only be intrested and ignore

if(!StatusValue){
    throw new Error("Invalid status value")
    res.send("Invalid Status")
}
// sender should presend in db
const senderPresentInDB = await User.findOne({_id : toUserID})
if(!senderPresentInDB){
    throw new error("User no present")
    res.send("Sender Not present in DB")
}

//send should be logged in before sending request

if(!req.decodedToken){
    throw new Error("Please Login")
}

//receiver can't send request if sender has already send the request
const existingConnectionRequest = await ConnectionRequestModel.findOne({
   $or:[
    {
        fromUserID,
        toUserID 
    },
    {
    fromUserID : toUserID , toUserID : fromUserID
    }
   ]
}) 
// console.log("From user ID --"+ fromUserID)
// console.log("To user ID --"+ toUserID)
// console.log("existing==>",existingConnectionRequest)
if(existingConnectionRequest){
    throw new Error("Already Sended the Request")

}

//User can't send request to itself
if(fromUserID === toUserID){
    throw new Error("can't send request to yourself")
}


const ConnectionRequestData = new ConnectionRequestModel({
    toUserID,
    fromUserID,
    status
})

const data = await ConnectionRequestData.save()
res.json({message : "successfully request sended" ,data}
    )
}
catch(err){ 
    console.log(err)
        res.send("error" + err.message)
    }

})

// PENDING ...... NOT COMPLETED AND CODE IS ALSO WRONG....
ConnectionRouter.post("/request/received/:status/:requestedID" , userAuth, async(req ,res)=>{
    try{
    const requestID = req.params.requestID;
    const status = req.params.status
    const loggedInUser = req.User

    //Validations : 

    // 1. Allowed Value of status
    const allowedStatus = ["Accepted" , "Rejected"]
    const IsStatusValid = allowedStatus.includes(status)

    if(!IsStatusValid){
        throw new Error("Status Value is not valid")
    }

    //
    const connectionrequest = ConnectionRequestModel.findOne({
        _id:requestID,
        toUserID : loggedInUser,
        status : "Interested"
    })

    if(!connectionrequest){
        res.json({"message" : "Request not found"})
    }



    }
    catch(err){
        res.json({message : "Error in responding user request" + err})
    }
  
})

module.exports = ConnectionRouter
