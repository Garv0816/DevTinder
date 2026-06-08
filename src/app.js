const express =  require("express")
const DB = require("./config/database")
const User = require("./models/user")
const{validation} =  require("./utiles/validation")
const bcrypt  = require("bcrypt")
const app = express()

app.use(express.json())

app.post("/signup" , async(req , res)=>{
    try{
        const{firstName , lastName , email , password} = req.body
        //validation for new user
        validation(req)
        //encryption of password
        
        const EncryptedPassword = await bcrypt.hash(password , 10)
        console.log(EncryptedPassword)

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

app.post("/login", async(req,res)=>{
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
            res.send("Logic Successful")
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
app.get("/user" , async(req ,res)=>{
    const UserEmail = req.body.email
    try{
        const user = await User.find({email : UserEmail})
        if(user.length ===0 ){
            res.send("User Not Found")
        }else{
            res.send(user)
        }
        
        
    }
    catch(err){
        res.status(404).send("Error Occured")
    }
   
})
app.delete("/user",async(req,res)=>{
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
app.patch("/user",async(req , res)=>{
    try{
        
        // taking data json from patch
    const userID = req.body.userID
    const UpdatedUserData = req.body

        // Limited data can be modifies not all 
        const isAllowedToUpdate = ["userID" ,"firstName" , "lastName", "age","PhotoURL" , "skills" , "password"]
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
DB()
.then(()=>{console.log("success in setting up the DB")
app.listen
(3000, ()=>
    {console.log("Server running successfully on port number 3000")})

})
.catch((err)=>{console.log("Error while connecting to DB")})
