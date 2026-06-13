const express =  require("express")
const DB = require("./config/database")
const router =  require("./Router/auth")
const cookieParcel = require("cookie-parser")
const profileRouter = require("./Router/Profile")
const ConnectionRouter = require("./Router/connectionrequest")
const RequestRouter = require("./Router/user")
const app = express()

app.use(express.json())
app.use(cookieParcel())


app.use("/" , router)
app.use("/", profileRouter)
app.use("/" , ConnectionRouter)
app.use("/", RequestRouter)
console.log("ConnectionRouter",ConnectionRouter.route)


DB()
.then(()=>{console.log("success in setting up the DB")
app.listen
(3000, ()=>
    {console.log("Server running successfully on port number 3000")})

})
.catch((err)=>{console.log("Error while connecting to DB")})
