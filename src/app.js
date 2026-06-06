const express = require('express');
const app = express();

app.use("/test",(req , res)=>{
    res.send("hello from server")
})
app.use("/hello",(req , res)=>{
    res.send("hello 222222 this is my server from server")
})

app.listen(3000, function(){console.log("server is runninng at port number 3000")})
