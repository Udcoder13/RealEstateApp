const userModel = require('../Models/user')
const bcryptjs = require("bcryptjs");
const errorHandler = require('../Utils/errorHandler');


const signUp = async(req,res,next)=>{
    const data = req.body;
    // console.log(data)
    const securedPass = bcryptjs.hashSync(data.password, 10)
    const user = {
        username:data.username,
        email:data.email,
        password:securedPass
    }
    try {
        await userModel.create(user);
        res.json({message:"user created"})
        console.log("user created")
        // res.send(user)
    } catch (error) {
        next(error)
    }
    
}

module.exports = { signUp }