const express =  require("express")
const profileRouter =  express.Router()
const userAuth = require("../userAuth/userAuth")
const User = require("../models/user")


profileRouter.get("/profile/view",userAuth,async(req , res)=>{
//taking cookie from client to server for validation...
try{
    const userID = req.userID
    const ProfilePage = await User.findOne({_id : userID})
    res.send(ProfilePage)
}
catch(err){
    throw new Error("Please Login")
}                

})

profileRouter.delete("/user/delete",async(req,res)=>{
    const userID = req.body.userID
    try{
        await User.findByIdAndDelete(userID)
        res.send("User Deleted Successfully")       
    }
    catch(err){
        console.log(err)
        res.status(404).send("User Not Deleted")
    }
})

// Updating User Data 
profileRouter.patch("/user/update",userAuth,async(req , res)=>{
    try{    
    // taking data json from patch
    const userID = req.body.userID
    const UpdatedUserData = req.body

        // Limited data can be modifies not all 
        const isAllowedToUpdate = ["userID" ,"firstName" , "lastName", "age","PhotoURL" , "skills" , "password","gender"]
        // checking for each element of data if those paramter exists in allowed update 

        const AllowedUpdate = Object.keys(UpdatedUserData).every(k=> isAllowedToUpdate.includes(k))
        if(!AllowedUpdate){
            throw new Error("User can not be added")
        }

    const UpdatedUserDB = await User.findByIdAndUpdate
    (userID , UpdatedUserData)
        
        await UpdatedUserDB.save()
        res.send("Data Updated successfully")
    }
    catch(err){
        console.log(err)
        //console.log(UpdatedUserData)
        res.send("Data Didn't Updated")
       
    }
    runValidator :true
    

})
module.exports = profileRouter