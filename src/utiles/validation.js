const validator = require("validator")

const validation = (req)=>{
const{firstName , lastName , email, password} = req.body

if(!firstName || !lastName){
throw new Error("Please enter Name")
}
else if(firstName.min> 3 || lastName.max<40){
    throw new Error("Name can only have 3-40 character")
}
else if(!validator.isEmail(email)){
throw new Error("Invalid Email")
}
else if(!validator.isStrongPassword(password)){
throw new Error("Password is not strong")
}

}
module.exports = {validation}