const userModel = require('../Models/user')
const bcryptjs = require("bcryptjs");
const errorHandler = require('../Utils/errorHandler');
const jwt = require('jsonwebtoken');
const updateUser = async(req,res,next)=>{
    console.log(req.params.id)
    console.log(req.user.id)
    if(req.user.id !== req.params.id) return(next(errorHandler(403, "Forbidden")))
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updateProfile = await userModel.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true})

        const {password,...rest} = updateProfile._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

module.exports = { updateUser }