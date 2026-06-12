const jwt = require("jsonwebtoken")
const cookieParcel = require("cookie-parser")

const userAuth = (req, res,next)=>{
    try{
    //console.log("hello")
    const token = req.cookies.token
   
    const decodedToken = jwt.verify(token , "GarvKingMaster")
        req.decodedToken = decodedToken //this export is used in connection request to verify if user logged in before sending req
    const userID = decodedToken._id
    req.userID = userID
    next()
    }
    catch(err){
      
        res.send("Please Loginn")
    }
}

module.exports = userAuth
