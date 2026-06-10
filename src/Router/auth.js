const express = require("express")
const bcrypt  = require("bcrypt")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const router =  express.Router()
const{validation} =  require("../utiles/validation")
const cookieParcel = require("cookie-parser")


router.post("/signup" , async(req , res)=>{
    try{
        const{firstName , lastName , email , password} = req.body
        //validation for new user
        validation(req)
        //encryption of password
        
        const EncryptedPassword = await bcrypt.hash(password , 10)
       
        // creating new instance for user
        const newUser = new User({firstName,
            lastName,
            email,
            password : EncryptedPassword
    })
    // storing new instance in Data Base
        await newUser.save()
        res.send("User Added successfully !")
    }
    catch(err){
        res.status(401).send("User can't be Added" + err.message)
    }
    
})

router.post("/login", async(req,res)=>{
    try{
        const{email ,  password} = req.body
        // checking if email presend in DB usin findOne
        const user =await User.findOne({email : email})
        if(!user){
            throw new Error("Email do not exist in DB")
        }
        // checking password is correct or not
        const checkedPassword =  await bcrypt.compare(password , user.password)
        if(checkedPassword){
            // creating JWT Token from Jsonwebtoken
            const token = await user.getjwt() ;
            //console.log(token)
            // sending the cookie to client .....
            res.cookie("token" , token)
            res.send("cookie send successfully")
        }
        else{
            throw new Error("Error")
        }
    }
    catch(err){
        console.log(err)
        res.send("error while login your page")
    }
    
})

router.post("/logout", (req, res) => {
    res.cookie("token", "", {
        expires: new Date(Date.now())
    });

    res.send("Logout Successful");

});

module.exports = router;