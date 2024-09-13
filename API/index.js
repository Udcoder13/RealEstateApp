const express = require('express')
const dbConnect = require('./DB')
const userRoute = require('./Router/userRoute')
const path = require("path");
const bodyParser = require("body-parser");
const updateRoute = require("./Router/updateRoute")
const cookieParser = require("cookie-parser")
const listingRoute = require("./Router/listingRoute")


const app = express();

dbConnect();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/user", userRoute)
app.use("/api/update", updateRoute)
app.use("/api/listing", listingRoute)

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, "client","dist","index.html"));
})

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
