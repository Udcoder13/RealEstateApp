const express = require('express')
const dbConnect = require('./DB')
const userRoute = require('./Router/userRoute')
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

dbConnect();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", userRoute)

app.use((error,req,res,next)=>{
    const statusCode = error.statusCode || 500
    const message = error.message || "Internal server error"
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
