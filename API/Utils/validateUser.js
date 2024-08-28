const errorHandler = require("./errorHandler");
const jwt = require("jsonwebtoken")

function validateUser(req,res,next){
    // console.log(req.cookies)
    const token = req.cookies.access_token;
    if(!token){
        return (next(errorHandler(401, "Unauthorised access")))
    }
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error,user)=>{
        if(error){
            console.log(error)
            return (next(errorHandler(403, "Forbidden")))
        }
        // console.log(user)
        req.user = user;
        console.log(req.user)
        next()
    })
}

module.exports = validateUser