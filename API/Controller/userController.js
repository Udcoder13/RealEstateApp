const userModel = require('../Models/user')
const bcryptjs = require("bcryptjs");


const signUp = async(req,res)=>{
    const data = req.body;
    console.log(data)
    const securedPass = bcryptjs.hashSync(data.password, 10)
    const user = {
        username:data.username,
        email:data.email,
        password:securedPass
    }
    try {
        await userModel.create(user);
        console.log("user created")
        res.send(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
    
}

module.exports = { signUp }