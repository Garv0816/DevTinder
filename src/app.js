const express =  require("express")
const DB = require("./config/database")
const User = require("./models/user")
const app = express()

app.use(express.json())

app.post("/signup" , async (req ,res)=>{

    const user = new User(req.body)
try{
  await user.save()
  res.send("User added successfully")
}
catch(err){
    console.log("error adding new user")
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
app.delete("/user",(req,res)=>{
    const userID = req.body.userID
})
DB()
.then(()=>{console.log("success in setting up the DB")
app.listen
(3000, ()=>
    {console.log("Server running successfully on port number 3000")})

})
.catch((err)=>{console.log("Error while connecting to DB")})
