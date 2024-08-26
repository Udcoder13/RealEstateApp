const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: '../Assets/default.png'
    }
},{timestamps:true})

const userModel = mongoose.model('User',user);

module.exports = userModel;