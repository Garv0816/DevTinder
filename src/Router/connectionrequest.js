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
    res.send("Invalid Status")
}
// sender should presend in db
const senderPresentInDB = await User.findOne({_id : toUserID})
if(!senderPresentInDB){
    res.send("Sender Not present in DB")
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
        res.send("error")
    }

})

module.exports = ConnectionRouter
