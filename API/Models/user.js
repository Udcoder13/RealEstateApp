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
        default: 'https://firebasestorage.googleapis.com/v0/b/real-estate-mern-711ee.appspot.com/o/default.png?alt=media&token=f65db1b8-9e61-40b0-88cf-408ef303ad75'
    }
},{timestamps:true})

const userModel = mongoose.model('User',user);

module.exports = userModel;