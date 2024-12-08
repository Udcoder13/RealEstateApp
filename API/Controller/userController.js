const userModel = require('../Models/user')
const bcryptjs = require("bcryptjs");
const errorHandler = require('../Utils/errorHandler');
const jwt = require('jsonwebtoken');


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

const login = async(req,res,next)=>{
    const data = req.body;
    console.log(data);
    try {
        const result = await  userModel.findOne({email:data.email})
        if(!result){
            return next(errorHandler(404,"User Not found"))
        }
        const passCompare = bcryptjs.compareSync(data.password,result.password)
        if(!passCompare){
            return next(errorHandler(401,"Wrong Credentials"))
        }
        const token = jwt.sign({id:result._id},process.env.JWT_SECRET_KEY)
        const {password: pass, ...rest} = result._doc
        res.cookie('access_token',token, {httpOnly: true})
        .status(200)
        .json(rest)
    } catch (error) {
        next(error)
    }
}

const googleLogin = async(req,res,next)=>{
    const data = req.body;
    try {
        const result = await  userModel.findOne({email:data.email})
        if(result){
            const token = jwt.sign({id:result._id},process.env.JWT_SECRET_KEY,)
            const {password: pass, ...rest} = result._doc
            res.cookie('access_token',token, {httpOnly: true})
            .status(200)
            .json(rest)
        }
        else{
            const generatedPass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPass = bcryptjs.hashSync(generatedPass,10);
            const newUser = {username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email:req.body.email, password: hashedPass, avatar: req.body.photo
            }
            const rslt = await userModel.create(newUser);
            const token = jwt.sign({id:rslt._id},process.env.JWT_SECRET_KEY,)
            const {password: pass, ...rest} = rslt._doc
            res.cookie('access_token',token, {httpOnly: true})
            .status(200)
            .json(rest)
        }
        
    } catch (error) {
        next(error)
    }
}

const getLandlord = async(req,res,next)=>{
    try {
        const landlord = await userModel.findById(req.params.userId)
        res.status(200).json(landlord)
    } catch (error) {
        next(error)
    }
}

module.exports = { signUp, login, googleLogin, getLandlord }