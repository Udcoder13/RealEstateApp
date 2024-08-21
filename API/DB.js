const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

async function dataBaseConnect(){
    try{
        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING)
        console.log("Database connected");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = dataBaseConnect;